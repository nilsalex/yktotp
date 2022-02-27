# yktotp

**❗This is still work in progress and currently supporting Google Chrome only.❗**

Browser extension to retrieve an OTP from a YubiKey.

## Installation

- Enable *Developer mode* and load the extension as *unpacked extension* as described in the
  [Google Chrome documentation](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked).
- Install the `yktotp-jsonapi` binary and the corresponding Native Messaging Host manifest
  as described in the [yktotp-jsonapi repository](https://github.com/nilsalex/yktotp-jsonapi#readme).

## Usage

**The extension is in proof-of-concept-state, but a certain subset of the intended functionality
is already working:**

Press `Alt+T` in order to activate the extension. A popup will show where the name of the OTP
has to be entered. Submit with `Enter` and wait for the response, which will be shown as text
underneath the input field.

For a successful response, the YubiKey has to be plugged in and, depending on how the OTP is configured,
touched. Note that it is not required to enter the whole name of the OTP, any string matching the name is
fine *as long as there is only one match*.
