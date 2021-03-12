/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export interface IApiService {
  token: string;
  baseUrl: string;
  config: any;
  get: (path: string, extras?: AxiosRequestConfig) => AxiosPromise<any>;
  post: (path: string, data: any, extras?: AxiosRequestConfig) => AxiosPromise<any>;
  put: (path: string, data: any, extras?: AxiosRequestConfig) => AxiosPromise<any>;
  delete: (path: string, extras?: any) => AxiosPromise<any>;
  uploadFiles: (
    path: string,
    files: File[],
    extras?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<any>[]>;
  openFile: (path: string, filename: string, method?: Method) => void;
  downloadFile: (path: string, filename: string, method?: Method) => void;
}

class ApiService implements IApiService {
  baseUrl: string;
  token: string;
  config: AxiosRequestConfig;

  constructor(token = '') {
    this.token = token;
    this.baseUrl = process.env.REACT_APP_API_ENDPOINT as string;
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  get = (path: string, extras?: AxiosRequestConfig): AxiosPromise<any> => {
    const newConfig = extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.get(this.baseUrl + path, newConfig);
  };

  post = (path: string, data: any, extras?: AxiosRequestConfig): AxiosPromise<any> => {
    const newConfig = (extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config) as AxiosRequestConfig;
    return axios.post(this.baseUrl + path, data, newConfig);
  };

  put = (path: string, data: any, extras?: AxiosRequestConfig): AxiosPromise<any> => {
    const newConfig = (extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config) as AxiosRequestConfig;
    return axios.put(this.baseUrl + path, data, newConfig);
  };

  delete = (path: string, extras?: AxiosRequestConfig): AxiosPromise<any> => {
    const newConfig = (extras
      ? { headers: { ...this.config.headers, ...extras.headers } }
      : this.config) as AxiosRequestConfig;
    return axios.delete(this.baseUrl + path, newConfig);
  };

  uploadFiles = (
    path: string,
    files: File[],
    extraHeaders?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>[]> => {
    const newConfig = (extraHeaders
      ? { headers: { ...this.config.headers, ...extraHeaders.headers } }
      : this.config) as AxiosRequestConfig;
    const promiseArray = files.map((file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return axios.post(this.baseUrl + path, formData, newConfig);
    });
    return axios.all(promiseArray);
  };

  openFile = (path: string, filename: string, method: Method = 'get'): void => {
    const extension = filename.split('.').pop();
    let type = 'application/octet';
    switch (extension) {
      case 'pdf':
        type = 'application/pdf';
        break;
      case 'png':
        type = 'image/png';
        break;
      case 'jpg':
        type = 'image/jpeg';
        break;
      default:
        this.downloadFile(path, filename, method);
        return;
    }
    this.fetchBlobURL(path, type, method).then((blobUrl: string) => {
      window.open(blobUrl);
    });
  };

  downloadFile = (path: string, filename: string, method: Method = 'get'): void => {
    this.fetchBlobURL(path, 'application/octet-stream', method).then((blobUrl: string) => {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', filename);

      const clickHandler = () => {
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          link.removeEventListener('click', clickHandler);
          document.body.removeChild(link);
        }, 150);
      };

      document.body.appendChild(link);
      link.addEventListener('click', clickHandler, false);
      link.click();
    });
  };

  private fetchBlobURL = (path: string, type: string, method: Method = 'get') => {
    return axios({
      url: this.baseUrl + path,
      method,
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then(response => {
      if (response.status >= 400 && response.status < 600) throw new Error(response.statusText);
      const bloburl = window.URL.createObjectURL(new Blob([response.data], { type }));
      return bloburl;
    });
  };
}

export default ApiService;
