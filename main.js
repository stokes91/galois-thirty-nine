/*
   Copyright 2020 Alexander Stokes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

const AlphaNumeric = "WXYZBCDEFGHJKLMNO123456789PQRTUV";

class GaloisThirtyNine {
  constructor() {
    this.lowBits = 0;
    this.highBits = 1;
  }

  iterate() {
    // 39 35
    const bit = ((this.lowBits >>> 0) ^ (this.lowBits >>> 4)) & 1;

    this.lowBits = (((this.highBits & 1) << 31) | (this.lowBits >>> 1)) >>> 0;
    this.highBits = (bit << 6) | (this.highBits >>> 1);

    return this;
  }

  toString() {
    const r = [
      this.highBits >>> 3,
      this.lowBits,
      this.lowBits >>> 5,
      this.lowBits >>> 10,
      this.lowBits >>> 15,
      this.lowBits >>> 20,
      this.lowBits >>> 25,
      (this.highBits << 2) | (this.lowBits >>> 30),
    ];

    return r
      .map((b) => {
        b &= 0x1f;
        return AlphaNumeric[b];
      })
      .join("");
  }

  toDBString() {
    const buf = Buffer.allocUnsafe(5);
    buf.writeUInt8(this.highBits, 0);
    buf.writeUInt32BE(this.lowBits, 1);
    return buf.toString("hex");
  }
}

GaloisThirtyNine.from = (input) => {
  if (!/[\da-f]{10}/gi.test(input)) {
    return false;
  }

  const lfsr = new GaloisThirtyNine();

  const buf = Buffer.from(input, "hex");
  lfsr.highBits = buf.readUInt8(0);
  lfsr.lowBits = buf.readUInt32BE(1);
  return lfsr;
};

module.exports = GaloisThirtyNine;
