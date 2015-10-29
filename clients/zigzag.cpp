#include <stdio.h>

int main()
{
  unsigned int n;
  int r;

  for(n = 0; n < 10; n++) {
    r = (n >> 1) ^ (-(n & 1));
    printf("%u => %d\n", n, r);
  }

  return 0;
}