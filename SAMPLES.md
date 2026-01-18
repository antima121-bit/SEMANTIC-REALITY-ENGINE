# S.R.E. Test Samples (Hindi / Hinglish)

Copy and paste these into the "Input Stream" panel to test specific domain logic.

## 1. Legal Domain
**Trigger:** `कर्मचारी को नोटिस` (Employee Notice)
```text
कर्मचारी को नोटिस अवधि के दौरान सेवा से हटाया नहीं जाएगा।
```
*Expected Result:* High confidence Legal domain, strict "shall not terminate" obligation.

## 2. Medical Domain
**Trigger:** `मरीज को` (To Patient)
```text
मरीज को दिन में दो बार 500 मिलीग्राम दवा दी जाए।
```
*Expected Result:* Critical compliance alert, medical domain, dosage instructions.

## 3. Administrative Domain
**Trigger:** `फाइल को` (To File)
```text
फाइल को तीन कार्य दिवसों के भीतर अनुमोदन हेतु प्रस्तुत किया जाए।
```
*Expected Result:* Administrative deadline, medium risk.

## 4. Ambiguity Test
**Trigger:** `कल दवा बंद` (Stop medicine tomorrow/yesterday?)
```text
कल दवा बंद करें।
```
*Expected Result:* **CRITICAL AMBIGUITY FLAG**. "Kal" can mean tomorrow or yesterday.
