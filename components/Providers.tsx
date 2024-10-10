import React from "react";
import { Provider } from "react-redux";
import { store } from "../shared/rdx-store";
import App from "../App";
import { NavigationContainer } from "@react-navigation/native";
import ZegoExpressEngine from 'zego-express-engine-reactnative';
import { ZC_APP_ID, ZC_APP_SIGN } from "../assets/vars";

const profile = {
    appID : ZC_APP_ID,
    scenario : 0,
    appSign: ZC_APP_SIGN
};

ZegoExpressEngine.createEngineWithProfile(profile)

const ProvidersComp = React.memo((props: any) => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </Provider>
    )
})

export default ProvidersComp