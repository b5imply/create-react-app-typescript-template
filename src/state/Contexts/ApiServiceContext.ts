/* eslint-disable @typescript-eslint/naming-convention */
import { createContext } from 'react';
import ApiService, { IApiService } from '../../services/ApiService/ApiService';

const ApiServiceContext = createContext<IApiService>(new ApiService());

export default ApiServiceContext;
