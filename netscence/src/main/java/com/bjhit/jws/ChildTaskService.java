package com.bjhit.jws;

import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

@WebService
@SOAPBinding(style = SOAPBinding.Style.RPC)
public interface ChildTaskService {
    @WebResult(name = "handleTask")
    public int handleTask(@WebParam(name = "taskid")String taskid, @WebParam(name = "handleType")String handleType);
}
