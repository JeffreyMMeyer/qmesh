#include <fstream>
#include <iostream>
#include <vector>
#include <string.h>

using namespace std;

struct QuantizedMeshHeader
{
    // The center of the tile in Earth-centered Fixed coordinates.
    double CenterX;
    double CenterY;
    double CenterZ;
    
    // The minimum and maximum heights in the area covered by this tile.
    // The minimum may be lower and the maximum may be higher than
    // the height of any vertex in this tile in the case that the min/max vertex
    // was removed during mesh simplification, but these are the appropriate
    // values to use for analysis or visualization.
    float MinimumHeight;
    float MaximumHeight;

    // The tile’s bounding sphere.  The X,Y,Z coordinates are again expressed
    // in Earth-centered Fixed coordinates, and the radius is in meters.
    double BoundingSphereCenterX;
    double BoundingSphereCenterY;
    double BoundingSphereCenterZ;
    double BoundingSphereRadius;

    // The horizon occlusion point, expressed in the ellipsoid-scaled Earth-centered Fixed frame.
    // If this point is below the horizon, the entire tile is below the horizon.
    // See http://cesiumjs.org/2013/04/25/Horizon-culling/ for more information.
    double HorizonOcclusionPointX;
    double HorizonOcclusionPointY;
    double HorizonOcclusionPointZ;
};


struct VertexData
{
    static const unsigned int vertexCount = 10; 
    unsigned short u[vertexCount];
    unsigned short v[vertexCount];
    unsigned short height[vertexCount];
};


int main(int argc, const char *argv[])
{
	unsigned int vertexCount;

	QuantizedMeshHeader header;
	VertexData vertexData;
    ifstream input_file("3452.terrain", ios::binary);
	input_file.read((char*)&header, sizeof(header));

	cout.precision(15);
	cout << "X: ";
	cout << fixed << header.BoundingSphereCenterX << endl;
	cout << "\n";
	
	cout << "Y: ";
	cout << fixed << header.BoundingSphereCenterY << endl;
	cout << "\n";

	cout << "Z: ";
	cout << fixed << header.BoundingSphereCenterZ << endl;
	cout << "\n";


	input_file.read((char*)&vertexCount, sizeof(vertexCount));
		
	cout << "Vertrex Count: ";
	cout << vertexCount;
	cout << "\n";

	cout << "Loading vertices: ";

	// unsigned short u[vertexCount];
	// unsigned short v[vertexCount];
	// unsigned short heights[vertexCount];
	// unsigned int n;
	// int r;
	// int temp;
	// printf("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu: \n");
	// for(n = 0; n < vertexCount; n++) {
	// 	input_file.read((char*)&u[n], sizeof(u[0]));
	// 	printf("%u \n", u[n]);
	// 	temp = u[n];
	// 	r = (temp >> 1) ^ (-temp & 1);
	// 	printf("%u => %d\n", temp, r);
	// }

	// printf("vvvvvvvvvvvvvvvvvvvvvvvvvvvv: \n");
	// for(n = 0; n < vertexCount; n++) {
	// 	input_file.read((char*)&v[n], sizeof(v[0]));
	// 	printf("%u \n", v[n]);

	// 	temp = v[n];
	// 	r = (temp >> 1) ^ (-temp & 1);
	// 	printf("%u => %d\n", temp, r);
	// // 	r = (u[n] >> 1) ^ (-(u[n] & 1));
	// // 	printf("%u => %d\n", u[n], r);
	// }
	// printf("Hhhhhhhhhhhhhhhhhhhhhhhhhhhhhheights\n");
	// for(n = 0; n < vertexCount; n++) {
	// 	input_file.read((char*)&heights[n], sizeof(heights[0]));
	// 	printf("%u \n", heights[n]);

	// 	input_file.read((char*)&vertexData, sizeof(vertexData));

	// 	temp = heights[n];
	// 	r = (temp >> 1) ^ (-temp & 1);
	// 	printf("%u => %d\n", temp, r);
	// // 	r = (u[n] >> 1) ^ (-(u[n] & 1));
	// // 	printf("%u => %d\n", u[n], r);
	// }


	// input_file.read((char*)&vertexData, sizeof(vertexData));
	
	// // unsigned int n;
	// // int r;

	// // for(n = 0; n < 10; n++) {
	// // 	r = (vertexData.u[n] >> 1) ^ (-(vertexData.u[n] & 1));
	// // 	printf("%u => %d\n", vertexData.unsigned[n], r);
	// // }

	// cout << vertexData.u[0];
	// cout << "\n";
	// cout << vertexData.u[1];
	// cout << "\n";
	// cout << vertexData.u[2];
	// cout << "\n";
	// cout << vertexData.u[3];
	// cout << "\n";
	// cout << vertexData.u[4];
	// cout << "\n";
	// cout << vertexData.u[5];
	// cout << "\n";
	// cout << vertexData.u[6];
	// cout << "\n";
	// cout << vertexData.u[7];
	// cout << "\n";
	// cout << vertexData.u[8];
	// cout << "\n";
	// cout << vertexData.u[9];
	// cout << "\n";
	return 0;
}