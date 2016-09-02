package com.bjhit.util;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bjhit.service.KafkaConsumerFindCommand;
import com.bjhit.service.KafkaConsumerRecoverResult;
import com.bjhit.service.KafkaConsumerTasklistResult;

public class KafkaConsumerServlet extends HttpServlet {
    private static final long serialVersionUID = 7980699676599207317L;

    public KafkaConsumerServlet() {
        super();
    }

    public void destroy() {
        super.destroy(); // Just puts "destroy" string in log
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    public void init() throws ServletException {
        new KafkaConsumerFindCommand().start();
        new KafkaConsumerTasklistResult().start();
        new KafkaConsumerRecoverResult().start();
    }
        
}
