import { useState } from 'react';
import axios from 'axios';

const useAxios = (baseUrl) => {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  const resetAlert = () => {
    setAlert({ show: false, message: '', type: '' });
  };

  const makeRequest = async (method, endpoint, payload = null, showAlertFlag = true) => {
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      if (showAlertFlag) {
        showAlert('Book added successfully', 'success');
      }
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const get = async (endpoint, showAlertFlag = true) =>
    makeRequest('get', endpoint, null, showAlertFlag);
  const post = async (endpoint, payload, showAlertFlag = true) =>
    makeRequest('post', endpoint, payload, showAlertFlag);
  const update = async (endpoint, payload, showAlertFlag = true) =>
    makeRequest('put', endpoint, payload, showAlertFlag);
  const remove = async (endpoint, showAlertFlag = true) =>
    makeRequest('delete', endpoint, null, showAlertFlag);

  return { data, alert, loading, get, post, update, remove, resetAlert };
};

export default useAxios;
