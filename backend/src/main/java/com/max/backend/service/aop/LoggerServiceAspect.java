package com.max.backend.service.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

@Aspect
@Component
@Slf4j
public class LoggerServiceAspect {

    @Pointcut("execution(public * com.max.backend.service.impl.*.*(..))")
    public void callAllMethodsInService() {
    }

    @Before("callAllMethodsInService()")
    public void beforeCallAtMethod(JoinPoint jp) {
        String args = Arrays.stream(jp.getArgs())
                .map(Object::toString)
                .collect(Collectors.joining(","));

        log.info("Before " + jp + ", args=[" + args + "]");
    }

    @After("callAllMethodsInService()")
    public void afterCallAtMethod(JoinPoint jp) {
        log.info("After " + jp);
    }

    @AfterThrowing(pointcut = "callAllMethodsInService()", throwing = "e")
    public void afterThrowingAtMethod(Exception e) {
        log.error(e.getMessage());
    }

    @AfterReturning(pointcut = "callAllMethodsInService()", returning = "object")
    public void afterReturningAtMethod(Object object) {
        log.info("Return: " + object);
    }

}
