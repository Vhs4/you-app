import { StatusBar } from 'expo-status-bar';

import './global.css';
import Routes from 'routes';

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style="auto" />
    </>
  );
}
