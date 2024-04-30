import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css'
window.global ||= window;

Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);
