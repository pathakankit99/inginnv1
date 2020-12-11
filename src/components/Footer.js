import React from 'react'
import '../style/Footer.css'
import {ThemeProvider, ColorModeProvider} from "@chakra-ui/core"

function Footer({colorMode}) {
    
    const FooterBgColor = {  light: "#ffffff", dark: "#1d1e1f" };
    const FooterColor = { light: "#1d1e1f", dark: "#ffffff"};
    var style={
        backgroundColor: FooterBgColor[colorMode],
        color: FooterColor[colorMode]
    }
    
    return (
        <ThemeProvider>
            <ColorModeProvider>
                <div style={style} className="Footer">
                    <h2>Made with 💓 by AK99 ✨ </h2>        
                </div>
            </ColorModeProvider>
        </ThemeProvider>
    )
}
export default Footer
