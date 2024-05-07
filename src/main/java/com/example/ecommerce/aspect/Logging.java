package com.example.ecommerce.aspect;

import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Logging {
Logger log = LoggerFactory.getLogger(Logging.class);

    @Before(value = "execution(* com.example.ecommerce.service.*..*(..))")
    public void logBefore(JoinPoint joinPoint) {
        log.info(joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        System.out.println("Before method execution" + joinPoint.getSignature().getName());
    }

    @After(value = "execution(* com.example.ecommerce.service.*..*(..))")
    public void logAfter(JoinPoint joinPoint) {
        log.info(joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        System.out.println("After method execution" + joinPoint.getSignature().getName());
    }

    @Around(value = "execution(* com.example.ecommerce.service.*..*(..))")
    public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder("KBI: ");
        sb.append("[").append(joinPoint.getKind()).append("]\tfor: ").append(joinPoint.getSignature()).append("\twithArgs: ").append("(").append(StringUtils.join(joinPoint.getArgs(), ", ")).append(")");
        sb.append("\ttook: ");
        Object result = joinPoint.proceed();
        long endTime = System.currentTimeMillis();
        long elapsedTime = endTime - startTime;
        log.info(sb.toString());
        System.out.println(elapsedTime);
        return result;
    }
}
