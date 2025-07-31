// src/components/ComponentsList.jsx
import React, { useEffect, useState } from 'react';
import { useCapabilities } from '../context/CapabilitiesContext';

const ComponentsList = () => {
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null);
  const capabilities = useCapabilities();

  useEffect(() => {
    const loadComponents = async () => {
      // Wait until capabilities check is complete
      if (capabilities.isLoading) {
return;