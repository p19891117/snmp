package com.bjhit.jws;

import java.io.IOException;

import javax.jws.Oneway;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface FlowDevService {
    /**
     * 捕获包
     * @param taskid
     * @param handleType 1：开始抓包，2：结束抓包
     * @throws IOException
     */
	@Oneway
    @WebResult(name = "capPackets")
    public void capPackets(@WebParam(name = "taskid")String taskid, @WebParam(name = "handleType")String handleType) ;

    /**
     * 发送报文
     * @param taskid
     * @param protocolType ex：tcp、udp、icmp
     * @param startime
     * @param endtime
     */
    @WebResult(name = "sendPackets")
    public int sendPackets(@WebParam(name = "taskid")String taskid, @WebParam(name = "protocolType")String protocolType, 
            @WebParam(name = "startime")String startime, @WebParam(name = "endtime")String endtime);
}
