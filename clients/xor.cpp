#include <iostream>
#include <string.h>

int kk(int n) {
	int t =  (n << 1) ^ (n >> 31);
	std::cout << t;
	std::cout << "\n";
	return t;
}

int main(int argc, const char *argv[]) {

	bool one = false;
	bool two = false;
	bool three = one ^ two;
	
	int test = 5;
	int test2;

	// test2 = test << 4 ;
	test2 = kk(0);
	test2 = kk(-1);
	test2 = kk(1);
	test2 = kk(-2);
	test2 = kk(2);
	test2 = kk(2147483647);
	test2 = kk(-2147483647);
	std::cout << "\n";
	std::cout << three;
	std::cout << "\n";
}
