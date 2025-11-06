import ZodiacForm from '../components/ZodiacForm';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Japanese Zodiac Sign 🐉</h1>
      <p>Enter your birth date to discover your Juunishi sign!</p>
      <ZodiacForm />
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', padding: '50px', fontFamily: 'Arial' }
};
