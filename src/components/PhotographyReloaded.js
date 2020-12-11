import React, { useState } from "react";
import "../style/PhotographyReloaded.css";
import { Button } from "@chakra-ui/core";
import {IconButton} from "@material-ui/core"
import JudgesCard from "./JudgesCard"
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

function PhotographyReloaded({ colorMode }) {
  const ButtonBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const ButtonColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const HoverButtonColor = { light: "#1d1e1f", dark: "#ffffff" };

  const NavbarBgColor = { light: "#ffffff", dark: "#1d1e1f" };
  const NavbarColor = { light: "#1d1e1f", dark: "#ffffff" };

  const imgBrightness = { light: "brightness(100%)", dark: "brightness(20%)" };
  var imgStyle = {
    filter: imgBrightness[colorMode],
  };
  var style = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };
  var styleText = {
    color: NavbarColor[colorMode],
  };
  return (
    <div className="PhotographyReloaded">
      <div className="PhotographyReloadedSec1">
        <img src="images/PhotographyReloaded.webp" alt="INGINN Event" />
      </div>
      <div className="PhotographyReloadedSec1Content">
        <div>
          <h1>
            Photography<br></br>Reloaded<br></br>2020
          </h1>
          <div className="ButtonCenter">
            <a href="https://www.shortto.com/photographyreloaded2020" target="_blank">
              <Button
                bg={ButtonBgColor[colorMode]}
                color={ButtonColor[colorMode]}
                _hover={{
                  bg: HoverButtonBgColor[colorMode],
                  color: HoverButtonColor[colorMode],
                }}
                borderRadius="0"
                variant="solid"
                borderStyle="none"
              >
                Register Now
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div style={style} className="PhotographyReloadedMasterBackground">
      <div style={style} className="PhotographyReloadedSec2">
        <h1 className="SectionHeading">Event Process</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="PhotographyReloadedSec2Content">
            <div>
              <h3>October 22: Registration Close</h3>
              <h5 style={{ "padding-bottom": "5px" }}>Read Rules and Regulations before Registering</h5>
              <h5 style={{ "padding-top": "5px" }}>UPI ID for registeration fee 7031785903@upi</h5>
              <hr></hr>
            </div>
            <div>
              <h3>October 24: TOP 30 participants Announced</h3>
              <h5 style={{ "padding-bottom": "5px" }}>
                The submission of these winners will be sent to the Semi-Final
                judges
              </h5>
              <h5 style={{ "padding-top": "5px" }}>
                Submissions are selected on basis of Originality, Composition,
                color, lighting, Focus, Creativity
              </h5>
              <hr></hr>
            </div>
            <div>
              <h3>October 27: TOP 10 participants Announced</h3>
              <h5 style={{ "padding-bottom": "5px" }}>
                The submission of these winners will be sent to Finals judges
              </h5>
              <h5 style={{ "padding-top": "5px" }}>
                2 Submissions with the highest number of likes and comments will
                directly move to FINALS
              </h5>
              <hr></hr>
            </div>
            <div>
              <h3>October 30: TOP 3 participants Announced</h3>
              <h5>
                Prizes worth Rs 1000/- will be distributed among the winners
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div style={style} className="PhotographyReloadedSec3">
        <h1 className="SectionHeading">Judges</h1>
          <div className="PhotographyReloadedSec3Content">
              <JudgesCard 
               url="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/118787518_356280248742753_6081687888158181072_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&amp;_nc_cat=109&amp;_nc_ohc=uZ4reQEtqskAX8m5izy&amp;tp=19&amp;oh=7fedbbec04c8c803961eaecd73573145&amp;oe=5FB51718"
               colorMode={colorMode}
               name="Surbhi Kaushik"
               insta="https://www.instagram.com/surbhikaushik/"
               description="Surbhi is a Passionate Photographer and loves to travel. She is also the Co-Founder of goodshotz"/>
              <JudgesCard 
              url="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/121512828_125484429050950_462911500385947020_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&amp;_nc_cat=110&amp;_nc_ohc=2giP0SotKhMAX9p5rgp&amp;_nc_tp=15&amp;oh=91afe50e8c322b2a7504a0d335b7357a&amp;oe=5FB1BB96"
               colorMode={colorMode}
               name="Aarzoo Khurana"
               insta="https://www.instagram.com/aarzoo_khurana_photography/"
               description="Aarzoo Khurana, a Wildlife Photographer, has been into photography for half a decade.
               "/>
              <JudgesCard 
              url="https://www.rathikaramasamy.com/img/s/v-12/u623165990-o611927231-53.jpg"
               colorMode={colorMode}
               name="Rathika Ramasamy"
               insta="https://www.instagram.com/rathikaramasamy/"
               description="Rathika is arguably one of India's foremost wildlife photographers. She is passionate about birds and is specializing in bird photography."/>
              <JudgesCard 
              url="https://instagram.fccu4-2.fna.fbcdn.net/v/t51.2885-15/e35/15877297_1876850472594597_5426965132984975360_n.jpg?_nc_ht=instagram.fccu4-2.fna.fbcdn.net&amp;_nc_cat=109&amp;_nc_ohc=BzvsMJHo70gAX8AG6uc&amp;_nc_tp=18&amp;oh=9dd3d8daec33ac99674dbcd1987e1742&amp;oe=5FB3EF2F"
               colorMode={colorMode}
               name="Vivek Nigam"
               insta="https://www.instagram.com/nigamclicks/"
               description="Vivek is a passionate and creative photographer with over 30K+ followers on Instagram"/>
              <JudgesCard 
               url="https://satyambhuyan.com/wp-content/uploads/2020/07/DSC_28h41-copy-2-scaled.jpg"
               colorMode={colorMode}
               name="Satyam Bhuyan"
               insta="https://www.instagram.com/i.satyam5/"
               description="Published in @natgeoindia,@lonelyplanet @historytv18
               Runners up 2019 Nikon Shutterbug competition"/>
          </div>
      </div>
      <div style={style} className="PhotographyReloadedSec4">
      <h1 className="SectionHeading">Rules and Regulations</h1>
        <div className="PhotographyReloadedSec4Content">
          <ol>
          <li>The Decision of the judge is final</li>
          <li>Minimum 10:1 Like:comment ratio needs to be maintained</li>
          <li>Registration Fee once paid will not be refunded</li>
          </ol>
        </div>
      </div>
      <div style={style} className="PhotographyReloadedSec5">
      <h1 className="SectionHeading">FAQ</h1>
        <div className="PhotographyReloadedSec5Content">
         <Faq colorMode={colorMode} question="What's the judging process?" 
         answer="The judges give every submission a score out of 10. We collect all submissions and add all the scores and determine the winner"/>
         <Faq colorMode={colorMode} question="Whom should I contact for help?" answer="Email at inginn.lpu@gmail.com or call at 8130220138 / 8793394172"/>
         <Faq colorMode={colorMode} question="What will happen if I use Bot/Promotion Groups for promotion?" 
         answer="You will lose your chance of moving directly to the Finals. You will not be disqualified though"/>
         <Faq colorMode={colorMode} question="How to get Refund?" answer="No refunds under any circumstances"/>
         
        </div>
      </div>
   
      </div>
       </div>
  );
}

function Faq({colorMode, question, answer}){
  const [faq,setFaq]=useState(false)
  const faqStatus = () => {
    setFaq(!faq);
  };
  const NavbarBgColor = { light: "#1d1e1f", dark: "#ffffff" };
  const NavbarColor = { light: "#ffffff", dark: "#1d1e1f" };
  var style;
  if(faq==true){
   style={
     "display":"block"
   }
  }
  else{
    style={
      "display":"none"
    }
  }

  var style1 = {
    backgroundColor: NavbarBgColor[colorMode],
    color: NavbarColor[colorMode],
  };
  var styleText = {
    color: NavbarColor[colorMode],
  };
  return(
    <div className="FAQTab">
            <div onClick={faqStatus} className="FAQQuestion">
              <h5>
                {question}
              </h5>
              {
                faq==true?(
                  <IconButton style={{"color":"#fff"}} onClick={faqStatus}>
                  <FaArrowCircleUp/>
                  </IconButton>
                ):(
                  <IconButton style={{"color":"#fff"}} onClick={faqStatus}>
                  <FaArrowCircleDown/>
                  </IconButton>
                )
              }
            </div>
            <div style={style} className="FAQAnswer">
              <h5 style={style1}>{answer}</h5>
            </div>
    </div>
  )
}
export default PhotographyReloaded;
