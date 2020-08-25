import { PropertyProjectorConfig } from '@/types/global'
import { ReapitConnectSession } from '@reapit/connect-session'
import { constants } from 'os';
import React, { useState, useEffect } from "react";


export const getPropertyProjectorConfig = async (session: ReapitConnectSession): Promise<PropertyProjectorConfig> => {

  const response = await fetch("http://localhost:3000/dev/v1/property-projector-config/ABC/RPT");
  return response.json();

}
