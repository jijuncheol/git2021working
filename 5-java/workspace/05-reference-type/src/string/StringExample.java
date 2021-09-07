package string;

public class StringExample {

	public static void main(String[] args) {
		String name1 = "지준철"; // 자바에서는 문자열 쌍따옴표만
		String name2 = "지준철";
		// String 동치비교에서 이 방법을 쓰지 말것
		System.out.println(name1 == name2);
		// !! String인 경우 동치 비교에 equal 함수를 사용
		System.out.println(name1.equals(name2));

		String name3 = new String("지준철");
		String name4 = new String("지준철");
		// String 동치비교에서 이 방법을 쓰지 말것
		System.out.println(name3 == name4);
		// !! String인 경우 동치 비교에 equal 함수를 사용
		System.out.println(name3.equals(name4));

		// 절대하지 마세요.
//		if(name3 == "지준철") {
//			
//		}

		// equal 함수만 사용
//		if(name3.equals("지준철")) {
//			
//		}

	}

}
