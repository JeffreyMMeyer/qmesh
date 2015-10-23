// basic file operations
#include <iostream>
#include <fstream>
using namespace std;


// int main () {
//   ofstream myfile;

//   myfile.open ("test.txt");
//   myfile << "Writing this to a file.\n";
//   myfile.close();
//   return 0;
// }

int main() {

	double x;
    ifstream infile; 
    infile.open("test", ios::binary | ios::in);
    infile.read(&x, 4); // reads 7 bytes into a cell that is either 2 or 4 
	
	cout << x;
	infile.close();
}