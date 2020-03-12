package com.boco.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.boco.domain.JkptBaseUser;


public class CheckLoginInterceptor implements HandlerInterceptor {

	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)	throws Exception {
		
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2) throws Exception {
		// TODO Auto-generated method stub
		JkptBaseUser user = (JkptBaseUser)request.getSession().getAttribute("admin");
		if (user == null) {
			System.out.println("session不存在，跳转到登录页面");

			// 用于前台ajax判断session是否超时
			if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
				response.setHeader("sessionstatus", "timeout");
				response.setHeader("redirectUrl", request.getContextPath()
						+ "/login/toLogin.from");
			} else {
				response.sendRedirect(request.getContextPath()
						+ "/login/toLogin.from");
			}
			return false;	
		} else {
			return true;
		}		

	}

}
