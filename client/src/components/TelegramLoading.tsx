"use client";

import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import loader from '../assets/Telegram.json';

function TelegramLoading() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // или return <div>Загрузка...</div>

  return <Lottie animationData={loader} loop={true} />;
}

export default TelegramLoading;
