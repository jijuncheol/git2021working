package string;

public class StringExample {

	public static void main(String[] args) {
		String name1 = "����ö"; // �ڹٿ����� ���ڿ� �ֵ���ǥ��
		String name2 = "����ö";
		// String ��ġ�񱳿��� �� ����� ���� ����
		System.out.println(name1 == name2);
		// !! String�� ��� ��ġ �񱳿� equal �Լ��� ���
		System.out.println(name1.equals(name2));

		String name3 = new String("����ö");
		String name4 = new String("����ö");
		// String ��ġ�񱳿��� �� ����� ���� ����
		System.out.println(name3 == name4);
		// !! String�� ��� ��ġ �񱳿� equal �Լ��� ���
		System.out.println(name3.equals(name4));

		// �������� ������.
//		if(name3 == "����ö") {
//			
//		}

		// equal �Լ��� ���
//		if(name3.equals("����ö")) {
//			
//		}

	}

}
