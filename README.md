# galois-thirty-nine

[![License: Apache 2](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
![Blazing Fast](https://img.shields.io/badge/speed-blazing%20🔥-brightgreen.svg)

This linear feedback shift-register with 39 bits counts to 549755813887.

- two-dimensional barcodes encode slightly more data for size
- human readable subtext that makes off-by-one errors detectable

If your particular use case has a first character conflict with an existing barcode, 
reorder the character set, before issuing ids.
The first character represents 4 bits, the following seven represent 35.
Every single possible id is reached, except for the all-zero internal value,
WWWWWWWW, which is a lockup condition to the shift register.

## Logic
Log2(2^39) = Log2((2^4) * (2^5)^7)
39 = 4 + 5 * 7

## Regular Expression
```
/^[WXYZBCDEFGHJKLMN][WXYZBCDEFGHJKLMNO123456789PQRTUV]{7}$/
```

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