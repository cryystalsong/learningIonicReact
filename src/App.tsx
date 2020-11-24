import React, {useRef, useState} from 'react';
import {
    IonApp,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton, IonAlert
} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Components

import WeightCompatibilityResult from "./components/WeightCompatibilityResult";

const App: React.FC = () => {

    const [weightCompatibilityResult, setWeightCompatibilityResult] = useState<string>();
    const [error, setError] = useState<string>();

    // TS also needs to know the inital type is null when userWeight is created
    // tells typescript that the ref is of type `HTMLIonInputElement` which is more flexible than string etc.
    const userWeight = useRef<HTMLIonInputElement>(null);
    const partnerWeight = useRef<HTMLIonInputElement>(null);

    const calculateWeightCompatibilty = () => {

        // current! tells TS that this will *never* be null,
        // since we can promise this ref will always be referred to the input val, can be empty string but not null
        let enteredUserWeight = userWeight.current!.value;
        let enteredPartnerWeight = partnerWeight.current!.value;

        // !enteredUserWeight  returns true if its empty string or null
        if (!enteredUserWeight || !enteredPartnerWeight) {
            setError("Please enter weights");
            return;
        }

        //adding a + converts a string to number
        enteredUserWeight = +enteredUserWeight;
        enteredPartnerWeight = +enteredPartnerWeight;

        if (enteredUserWeight <= 0 || enteredPartnerWeight <= 0) {
            setError("Please enter valid weights");
            return;
        }

        console.log(enteredUserWeight, enteredPartnerWeight);

        var buffer = 0.3 * enteredUserWeight;
        var minCap = enteredUserWeight - buffer;
        var maxCap = enteredUserWeight + buffer;

        if (minCap <= enteredPartnerWeight && enteredPartnerWeight <= maxCap) {
            setWeightCompatibilityResult('You would make great partners! Climb on!');
        } else {
            setWeightCompatibilityResult('Consider getting an ohm...');
        }
    }

    const resetWeightInputs = () => {
        userWeight.current!.value = ''
        partnerWeight.current!.value = ''
    }

    return (
        <React.Fragment>

            {/* !!error will yield `true` if error is not an empty string nor null */}
            <IonAlert
                isOpen={!!error}
                message={error}
                buttons={[{text: 'Ok', handler: ()=> {
                    setError('');
                    }}]}
            />

            <IonApp>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>
                            Compatibility
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel position='floating'>Your weight</IonLabel>
                        <IonInput type='number' ref={userWeight}></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position='floating'>Your partner's weight</IonLabel>
                        <IonInput type='number' ref={partnerWeight}></IonInput>
                    </IonItem>

                    <div className="ion-text-center ion-margin">
                        <IonButton id="weight-calculate-btn"
                                   onClick={calculateWeightCompatibilty}> {/*make sure only pointing to the function `calculateWeightCompatibilty`, not the *results* of the function calculateWeightCompatibilty()*/}
                            Calculate
                        </IonButton>
                        <IonButton id="weight-reset-btn" onClick={resetWeightInputs}>Reset</IonButton>
                    </div>

                    {weightCompatibilityResult && <WeightCompatibilityResult result={weightCompatibilityResult}/>}
                </IonContent>
            </IonApp>
        </React.Fragment>
    )
};

export default App;
