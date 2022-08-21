package com.max.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(
        properties = "spring.main.lazy-initialization=true",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class BackendApplicationTests {

    @Test
    void contextLoads() {
        BackendApplication.main(new String[]{});
        Assertions.assertTrue(true);
    }

}
