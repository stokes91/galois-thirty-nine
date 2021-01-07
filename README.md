Using a linear feedback shift register is a useful alternative to counting with digits when a larger character set is available.
This linear feedback shift-register with 39 bits counts to 549755813887, and can be displayed as a 14x14 datamatrix code.

## Example
```
const GaloisThirtyNine = require('galois-thirty-nine');

const lfsr = GaloisThirtyNine.from('321FACE0FF');

for (let l = 10; l--;) {
  lfsr.iterate();
  console.log(lfsr.toString());
}
```

## Expected Result
```
ZVZRKTEB
XVXM6UZ2
WVWEJVX9
WNO35VOK
FE89PNFD
KZRKTEBZ
MXM6UZ2X
NWEJVX9W
EO35VOKO
J89PNFD8
```