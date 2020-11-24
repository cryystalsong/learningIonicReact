import React from "react";
import {IonCard, IonCardContent} from "@ionic/react";

const WeightCompatibilityResult: React.FC<{result: string}> =
props => {
    return (
        <IonCard>
            <IonCardContent>
                <h2>{props.result}</h2>
            </IonCardContent>
        </IonCard>
)
};

export default WeightCompatibilityResult;