package com.example.testlombok;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestLombokApplicationTests {

	@Test
	void contextLoads() {
		Member member = new Member();
		member.setId(1);
		member.setName("hong");
		
		assertEquals(1, member.getId());
		assertEquals("hong", member.getName());
	}

}
