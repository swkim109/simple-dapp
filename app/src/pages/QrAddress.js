import React from "react";
import {QR, Flex, Text, Icon} from 'rimble-ui';
import { PopupLayer } from "../layouts/PopupLayout";

export default ({address, handleClose}) => {
    return (
        <PopupLayer>
            <div style={{textAlign: "right", paddingBottom: "5px"}}>
                <a style={{cursor:"pointer"}} onClick={handleClose}><Icon name="Close" size="20"/></a>
            </div>
            <Flex flexDirection="column" alignItems="center">
                <Text size="small">Scan this QR code with your mobile wallet.</Text>
                <br/>
                <QR value={address} size={150}/>
                <br/>
                <Text size="small">{address}</Text>
            </Flex>
        </PopupLayer>
    )
}

