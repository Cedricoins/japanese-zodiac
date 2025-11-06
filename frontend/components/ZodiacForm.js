import { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [
  "function getZodiacFromDate(uint256 year, uint256 month, uint256 day) view returns (string sign, string japanese)"
];

export default function ZodiacForm() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getZodiac = async () => {
    if (!date) return alert("Please select a date");
    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const [year, month, day] = date.split('-').map(Number);
      const [sign, japanese] = await contract.getZodiacFromDate(year, month, day);

      setResult({ sign, japanese, emoji: getEmoji(sign) });
    } catch (err) {
      console.error(err);
      alert("Error: Make sure you're on the right network and MetaMask is connected.");
    }
    setLoading(false);
  };

  const getEmoji = (sign) => {
    const map = {
      Rat: "🐀", Ox: "🐂", Tiger: "🐅", Rabbit: "🐇", Dragon: "🐉", Snake: "🐍",
      Horse: "🐎", Goat: "🐐", Monkey: "🐒", Rooster: "🐓", Dog: "🐕", Pig: "🐷"
    };
    return map[sign];
  };

  return (
    <div style={{ margin: '30px' }}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <br /><br />
      <button onClick={getZodiac} disabled={loading} style={btnStyle}>
        {loading ? "Loading..." : "Get My Japanese Zodiac"}
      </button>

      {result && (
        <div style={{ marginTop: '30px', fontSize: '24px' }}>
          <p><strong>{result.emoji} {result.sign}</strong></p>
          <p>Japanese: <strong>{result.japanese}</strong> (十二支)</p>
          <p>Born in {date}</p>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  padding: '12px 24px',
  fontSize: '18px',
  background: '#ff6b6b',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};
