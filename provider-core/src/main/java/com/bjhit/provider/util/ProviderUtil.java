package com.bjhit.provider.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.URL;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import kafka.javaapi.producer.Producer;

import org.apache.commons.net.telnet.TelnetClient;
import org.apache.xmlrpc.XmlRpcException;
import org.snmp4j.PDU;
import org.snmp4j.Snmp;
import org.snmp4j.asn1.BER;
import org.snmp4j.smi.BitString;
import org.snmp4j.smi.Counter32;
import org.snmp4j.smi.Counter64;
import org.snmp4j.smi.Gauge32;
import org.snmp4j.smi.Integer32;
import org.snmp4j.smi.IpAddress;
import org.snmp4j.smi.OID;
import org.snmp4j.smi.OctetString;
import org.snmp4j.smi.Opaque;
import org.snmp4j.smi.TimeTicks;
import org.snmp4j.smi.Variable;
import org.snmp4j.transport.DefaultUdpTransportMapping;

import com.bjhit.provider.exception.XSConnectionFail;
import com.bjhit.provider.exception.XSVMNotFound;
import com.google.gson.Gson;
import com.xensource.xenapi.APIVersion;
import com.xensource.xenapi.Connection;
import com.xensource.xenapi.Session;
import com.xensource.xenapi.Types.XenAPIException;
import com.xensource.xenapi.VM;

public class ProviderUtil {
	public static  List<Producer<String,String>> producers = new Vector<Producer<String,String>>();
	private static final Map<String,Object> CONTAINER_DATA = new Hashtable<String,Object>(); 
	private static final byte CONTAINER_DATA_FLAG_KAFKA_PRODUCER = 0b000; 
	private static final byte CONTAINER_DATA_FLAG_SNMP = 0b001; 
	private static final byte CONTAINER_DATA_FLAG_GSON = 0b100; 
	private static final byte CONTAINER_DATA_FLAG_PDU = 0b011;
	private static final byte CONTAINER_DATA_FLAG_UDP = 0b101; 
	@SuppressWarnings("unchecked")
	public static Producer<String,String> producer(){
		return (Producer<String,String>)obtainFromT(CONTAINER_DATA_FLAG_KAFKA_PRODUCER);
	}
	public static Snmp snmp(){
		return (Snmp) ProviderUtil.obtainFromT(CONTAINER_DATA_FLAG_SNMP);
	}
	public static Gson gson(){
		return (Gson) ProviderUtil.obtainFromT(CONTAINER_DATA_FLAG_GSON);
	}
	public static PDU pdu(int type){
		PDU pdu = (PDU) ProviderUtil.obtainFromT(CONTAINER_DATA_FLAG_PDU);
		pdu.clear();
		pdu.setType(type);
		return pdu;
	}
	private static Object obtainFromT(byte className){
		Object obj = CONTAINER_DATA.get(Thread.currentThread().getName()+className);
		if(obj==null){
			switch (className) {
			case CONTAINER_DATA_FLAG_KAFKA_PRODUCER:
				Producer<String, String> producer = null;
				producer = producers.remove(0);
				CONTAINER_DATA.put(Thread.currentThread().getName()+className,producer);
				return producer;
			case CONTAINER_DATA_FLAG_SNMP:
				try {
					Snmp snmp = new Snmp((DefaultUdpTransportMapping) obtainFromT(CONTAINER_DATA_FLAG_UDP));
					snmp.listen();
					CONTAINER_DATA.put(Thread.currentThread().getName()+className,snmp);
					return snmp;
				} catch (IOException e) {
					return obtainFromT(className);
				}
			case CONTAINER_DATA_FLAG_GSON:
				Gson gson = new Gson();
				CONTAINER_DATA.put(Thread.currentThread().getName()+className,gson);
				return gson;
			case CONTAINER_DATA_FLAG_PDU:
				PDU pdu = new PDU();
				CONTAINER_DATA.put(Thread.currentThread().getName()+className,pdu);
				return pdu;
			case CONTAINER_DATA_FLAG_UDP:
				try {
					DefaultUdpTransportMapping udp = new DefaultUdpTransportMapping();
					udp.setSocketTimeout(ReadFile.SNMP_DEFAULTUDPTRANSPORTMAPPING_SOCKETTIMEOUT);
					return udp;
				} catch (IOException e) {
					return obtainFromT(CONTAINER_DATA_FLAG_UDP);
				}
			default:
				return null;
			}
		}else{
			return obj;
		}
	}

	public static VM getVM(String uuidOrVMLabel, Connection connection) throws XSVMNotFound{
		VM vm = null;
		try {
			vm = VM.getByUuid(connection, uuidOrVMLabel);
			return vm;
		} catch (XenAPIException | XmlRpcException e) {
			throw new XSVMNotFound("由于获取vm途中出现故障，因此此次获取无效");
		} 
	}
	public static Connection connect(String[] serverTarget) throws XSConnectionFail{
		try {
			Connection connection = new Connection(new URL("http://"+serverTarget[0]));
			Session.loginWithPassword(connection,serverTarget[1],serverTarget[2], APIVersion.latest().toString());
			return connection;
		} catch (Exception e) {
			throw new XSConnectionFail("连接失败");
		}
	}
	public static void disconnect(Connection connection) {
		if (connection != null) {
			try {
				Session.logout(connection);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 
	 * @param pattern
	 * @param in
	 * @return
	 * @throws IOException
	 */
	public static String readUntil(String pattern,InputStream in) throws IOException {
			char lastChar = pattern.charAt(pattern.length() - 1);
			StringBuffer sb = new StringBuffer();
			char ch = (char) in.read();
			while (true) {
				sb.append(ch);
				if (ch == lastChar) {
					if (sb.toString().endsWith(pattern)) {
						return sb.toString();
					}
				}
				ch = (char) in.read();
			}
	}
	
	/** * 写 * * @param value */
	public static void write(String value,PrintStream out) {
		out.println(value);
		out.flush();
	}
	public static void close(TelnetClient telnet,InputStream in,PrintStream out) {
		if(out!=null){
			out.close();
		}
		if(in!=null){
			try {
				in.close();
			} catch (IOException e) {
			}
		}
		if(telnet!=null){
			try {
				telnet.disconnect();
			} catch (IOException e) {
			}
		}
	}
	
	public static String handle(Variable vb){
		switch (vb.getSyntax()) {
	      case BER.INTEGER:
	        return String.valueOf(((Integer32)vb).getValue());
	      case BER.BITSTRING:
	        return toChinese(((BitString)vb).getValue());
	      case BER.OPAQUE:
	        return toChinese( ((Opaque)vb).getValue());
	      case BER.OCTETSTRING:
	    	  return toChinese(((OctetString)vb).getValue());
	      case BER.OID:
	        return ((OID)vb).toString();
	      case BER.TIMETICKS:
	        return String.valueOf(((TimeTicks)vb).getValue());
	      case BER.COUNTER:
	        return String.valueOf(((Counter32)vb).getValue());
	      case BER.COUNTER64:
	        return String.valueOf(((Counter64)vb).getValue());
	      case BER.ENDOFMIBVIEW:
	        return "EndOfMibView";
	      case BER.GAUGE32:
	        return String.valueOf(((Gauge32)vb).getValue());
	      case BER.IPADDRESS:
	        return ((IpAddress)vb).toString();
	      case BER.NOSUCHINSTANCE:
	        return "NoSuchInstance";
	      case BER.NOSUCHOBJECT:
	        return "NoSuchObject";
	      case BER.NULL:
	        return "Null";
	      default:
	    	  return "?";
	    }
	}
	public static String toChinese(byte[] value) {
		for (int i=0; i<value.length; i++) {
			char c = (char)value[i];
			int codePoint =  (int)value[i];
			if (((codePoint > 0x0000 && codePoint <= 0x001F) ||(codePoint >= 0x007F && codePoint <= 0x009F)) && (!Character.isWhitespace(c))) {
				int digits = (int)Math.round((float)Math.log(256.0D) / Math.log(16));
	   	    	StringBuffer buf = new StringBuffer(value.length * (digits + 1));
	   	    	for (int z = 0; z < value.length; z++) {
		    		if (z > 0) {buf.append(':');}
		    		int v = value[z] & 0xFF;
		    		String val = Integer.toString(v, 16);
		    		for (int j = 0; j < digits - val.length(); j++) {
		    			buf.append('0');
		    		}
		    		buf.append(val);
	   	    	}
	   	    	return buf.toString();
			}
        }
      return new String(value);
	}
}
