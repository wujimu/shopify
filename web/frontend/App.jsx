import "typeface-baloo";
import "./themes/variables.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "animate.css";
import "./components/ListDetail/styles/Chartist.css";
import "./components/ListDetail/styles/App.css";
// import "./components/ListDetail/styles/GridStack.css";
import React, { useEffect, useState, useRef } from "react";
import { NavigationMenu } from "@shopify/app-bridge-react";
import { BrowserRouter, Routes, Route, useLocation } from "react_router_dom";
import {
  homeOutline,
  arrowForwardOutline,
  arrowDownOutline,
  chevronBack,
} from "ionicons/icons";
import {
  descriptionWorkStation,
  clear,
  bookshelf,
  save,
  aiIcon,
  pencilCase,
  newsPaperWorStation,
  readingTree,
  honeyCombGridDrop,
  beehive,
  readingBag,
} from "./assets";

import { IonReactRouter } from "@ionic/react-router";
import {
  setupIonicReact,
  IonApp,
  IonContent,
  IonRouterOutlet,
  IonPage,
  useIonRouter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonButtons,
  IonCol,
  IonText,
  useIonViewDidEnter,
  IonPopover,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonAlert,
} from "@ionic/react";
import {
  ListDetailComponent,
  ProductsCard,
  SubscriptionComponent,
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  ProductDataProvider,
  NavigationDataProvider,
  useNavigationDataContext,
  DataProvidersProvider,
  useDataProvidersContext,
  Search,
  Accordion,
  tinymceCustomPlugins,
  Workers,
  ImageCachePre,
  TokenUsageComponent,
  IonicHeaderComponent,
  WinkDataProvider,
  TinyMCEDataProvider,
  AnimatedContent,
} from "./components";

import { Email } from "./utilities/smtp";
import ExitFrame from "./pages/ExitIframe";
const svgAssets = import.meta.glob("./assets/*.svg");
tinymceCustomPlugins(tinymce);
setupIonicReact({ mode: "ios" });
export default function App() {
  // const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const navigationPanel = !DEPLOYMENT_ENV
    ? [
        {
          label: "Products Page",
          destination: "/",
        },
        {
          label: "Subscription",
          destination: "/subscriptions",
        },
        {
          label: "welcome",
          destination: "/welcome",
        },
        {
          label: "search",
          destination: "/search",
        },
        {
          label: "support-ticket",
          destination: "/support-ticket",
        },
      ]
    : [];

  return (
    <IonApp force-theme="gray">
      {/* <PolarisProvider>  */}
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationDataProvider>
              <NavigationMenu navigationLinks={navigationPanel} />
              <Workers>
                <TinyMCEDataProvider>
                  <WinkDataProvider>
                    <DataProvidersProvider>
                      <ProductDataProvider>
                        <IonMenuNav />
                      </ProductDataProvider>
                    </DataProvidersProvider>
                  </WinkDataProvider>
                </TinyMCEDataProvider>
              </Workers>
            </NavigationDataProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
      <PolarisProvider> </PolarisProvider>
    </IonApp>
  );
}

function LandingPage({ animationRef }) {
  const arrowRef = useRef(null);
  const [arrowAnimation, setArrowAnimation] = useState("animate__bounceIn");
  const { subscriptions, setUser, uncachedFetchData, allAssets , DataProviderNavigate } =
    useDataProvidersContext();

  useIonViewDidEnter(() => {
    arrowRef.current?.addEventListener("animationend", () => {
      setArrowAnimation("animate__tada"); // Apply another animation after the bounce
    });
  });

  useEffect(() => {
    return () => (arrowRef.current = null);
  }, []);
  const handleGetStarted = async () => {
    setArrowAnimation("animate__flip");
    const { data, error } = await uncachedFetchData({
      url: "/api/welcome/subscriber",
      method: "POST",
    });
    if (error === null) {
      setUser(data);
    } else {
      await DataProviderNavigate("/", {
        target: "host",
        relative: "path",
        state: "/welcome",
      });
    }
    setTimeout(async () => {
      DataProviderNavigate("/", { target: "host" });
    }, 2000); // Set the duration as needed
  };

  return (
    <IonPage
      ref={(el) => {
        animationRef.current = el;
      }}
    >
      <IonicHeaderComponent />
      <IonContent className="ion-padding">
        <IonText class="ion-padding-top">
          <IonGrid>
            <IonRow>
              <IonCol
                style={{
                  backgroundImage: `url(${honeyCombGridDrop})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  height: "100px",
                }}
                className="ion-text-center"
                size="12"
              >
                <IonRow>
                  <IonCol>
                    <h1
                      style={{
                        color: "#ef8561",
                        letterSpacing: "9px",
                        fontFamily: "'Baloo', sans-serif",
                        wordSpacing: "40px",
                        fontSize: "5vw",
                        float: "right",
                        paddingRight: "51px",
                        whiteSpace: "nowrap" /* Prevents wrapping */,
                        // overflow: "hidden", /* Clips content that overflows */
                        // textOverflow: "ellipsis"
                      }}
                    >
                      neural
                    </h1>
                  </IonCol>
                  <IonCol>
                    <h1
                      style={{
                        color: "#ef8561",
                        letterSpacing: "9px",
                        float: "left",
                        fontFamily: "'Baloo', sans-serif",
                        wordSpacing: "40px",
                        fontSize: "5vw",
                        paddingLeft: "53px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      nectar
                    </h1>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div
            style={{
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "300px",
              backgroundImage: `url(${readingTree})`,
            }}
          />
          <p className="ion-text-center">
            Experience a seamless journey with our amazing features.
          </p>
          <IonText color="dark">
            <h3
              style={{ fontFamily: "Baloo, san serif" }}
              className="ion-text-center ion-padding-top"
            >
              Thank You For Becoming a
            </h3>
            <h2
              style={{ fontFamily: "Baloo, sans-serif" }}
              className="ion-text-center ion-text-capitalize"
            >
              <IonText
                style={{ fontFamily: "Baloo, sans-serif" }}
                color="neural"
              >
                {subscriptions.join(" ")} Honey
              </IonText>
            </h2>
            <p
              style={{ fontFamily: "Baloo, sans-serif" }}
              className="ion-text-center"
            >
              Member
            </p>
          </IonText>
        </IonText>
        <div className="ion-text-center">
          <IonIcon
            ref={arrowRef}
            icon={
              arrowAnimation === "animate__flip"
                ? arrowDownOutline
                : arrowForwardOutline
            }
            size="large"
            color="primary"
            className={`animate__animated ${arrowAnimation}`}
          />
        </div>
        <div className="ion-text-center animate__animated animate__fadeInUp">
          <IonButton
            style={{ letterSpacing: "3px", fontFamily: "Baloo, sans-serif" }}
            fill="clear"
            expand="block"
            color="shoe"
            onClick={handleGetStarted}
          >
            Get Started
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

function NoMatch() {
  return <IonPage>404 Not Found</IonPage>;
}

function Description() {
  const {
    refDictionary,
    DataProviderNavigate,

    lockAllTasks,
    contentSaved,
    user,
  } = useDataProvidersContext();
useEffect(()=>{


  return ()=>
  {

  }
},[])
  return (
    <IonPage ref={refDictionary["/description"]}>
      <IonicHeaderComponent
        centerText={"Description Workstation"}
        left={
          <IonButtons key={"12"} slot="start">
            <IonButton
              color="neural"
              disabled={lockAllTasks}
              onClick={async () => {
                await DataProviderNavigate("/product-details");
              }}
              key={"13"}
            >
              <IonIcon slot="icon-only" key={"14"} icon={chevronBack} />
            </IonButton>
          </IonButtons>
        }
        right={
          <>
            {contentSaved && (
              <IonButton
                fill="clear"
                color={contentSaved && "success"}
                size="small"
                slot="end"
              >
                saving
              </IonButton>
            )}
            <IonButton
              size="small"
              disabled={true}
              fill="clear"
              color="neural"
              slot="end"
            >
              <IonIcon
                slot="icon-only"
                size="large"
                icon={descriptionWorkStation}
              />
            </IonButton>
            <IonButtons slot="end"/>
          </>
        }
      />

      <IonContent>
        <TokenUsageComponent tokenUsage={user} />
        <Accordion />
      </IonContent>
    </IonPage>
  );
}

function Article() {
  const {
    refDictionary,
    DataProviderNavigate,
    serverSentEventLoading,
    lockAllTasks,
    contentSaved,
  } = useDataProvidersContext();

  return (
    <IonPage key="IonPage/article" ref={refDictionary["/article"]}>
      <IonicHeaderComponent
        left={
          <IonButtons key={"12"} onClick={() => {}} slot="start">
            <IonButton
              color="neural"
              key="IonButtons/article"
              disabled={ lockAllTasks}
              onClick={() => {
                DataProviderNavigate("/product-details");
              }}
            >
              <IonIcon key={"14"} icon={chevronBack} />
            </IonButton>
          </IonButtons>
        }
        centerText={"Article Workstation"}
        right={
          <>
            {lockAllTasks && (
              <IonButton
                fill="clear"
                color={lockAllTasks && "success"}
                size="small"
                slot="end"
                key="contentSaved"
              >
                saved
              </IonButton>
            )}
            <IonButton
              key="ionButton/icon/asset"
              size="small"
              disabled={true}
              fill="clear"
              color="neural"
              slot="end"
            >
              <IonIcon
                key="ion/icon/asset/svg"
                slot="icon-only"
                size="large"
                icon={newsPaperWorStation}
              />
            </IonButton>
          </>
        }
      />
      <IonContent>
        <Accordion />
      </IonContent>
    </IonPage>
  );
}

// Import SMTP.js library

const BugReportPage = (React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bugType: "",
    bugDescription: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations (You can add more specific validations)
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.bugType === "" ||
      formData.bugDescription === ""
    ) {
      setShowAlert(true);
      return;
    }

    // Sending email using SMTP.js
    const emailToSend = {
      SecureToken: "376ee0cd-ab84-414e-a207-3ec8ca2d89bd", //2A4E18C4EE14D83137B68735833A9ED3B1D21FB887E521E76D9FCBC83FDDEE99802E471273AB80D3DC7C79AA9FB518DB
      //smtp password support@techsolutionsforge.com    8B5199E49BC1B7CFCCD4560DF930D755BDFE  2525
      // 2bef0aef-b2cc-4074-8cff-f291ce935b1b 
      To: "hasanseirafi69@gmail.com",
      From: "admin.shopify.com",
      Subject: `Bug Report `,
      Body: `
        Name: ${formData.name}
        Email: ${formData.email}
        Bug Type: ${formData.bugType}
        Bug Description: ${formData.bugDescription}
      `,
    };

    await Email.send(emailToSend);

    // Reset form data after submission
    // setFormData({
    //   name: "",
    //   email: "",
    //   bugType: "",
    //   bugDescription: "",
    // });

    // Show success message or redirect to a thank you page
    // (you can implement this as per your application flow)
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              type="text"
              name="name"
              value={formData.name}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              type="email"
              name="email"
              value={formData.email}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel>Bug Type</IonLabel>
            <IonSelect
              name="bugType"
              value={formData.bugType}
              onIonChange={handleInputChange}
              required
            >
              <IonSelectOption value="UI/UX">UI/UX</IonSelectOption>
              <IonSelectOption value="Functionality">
                Functionality
              </IonSelectOption>
              <IonSelectOption value="Performance">Performance</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Bug Description</IonLabel>
            <IonTextarea
              rows={6}
              name="bugDescription"
              value={formData.bugDescription}
              onIonChange={handleInputChange}
              required
            />
          </IonItem>

          <IonButton type="submit" expand="block">
            Submit
          </IonButton>
        </form>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Error"}
          message={"All fields are required."}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
});

function IonMenuNav() {
  const [currentRoute, setCurrentRoute] = useState("/");
  const location = useLocation();
  const router = useIonRouter();
  const {
    checkFeatureAccess,
    assistRequest,
    clearAssistResult,
    updateArticleMethod,
    markupText,
    refDictionary,
    DataProviderNavigate,
    serverSentEventLoading,
    lockAllTasks,
    contentSaved,
    sessionLoaded,
    allAssets,
  } = useDataProvidersContext();
  const { aiWorkStationSetter, aiWorkStation } = useNavigationDataContext();
  useEffect(() => {
    // console.log("pathname", location.pathname);
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  useEffect(async () => {
    console.log("svgAssets:", svgAssets);

    // await ImageCachePre(readingBag)
  }, []);

  if (!sessionLoaded) return null;
  const tabs = {
    "/subscriptions": [
      {
        access: checkFeatureAccess(["free"]),
        label: "Home",
        icon: homeOutline,
        clickHandler: async (event, hasAccess, router) => {
          await DataProviderNavigate("/", { target: "host" });
        },
      },
    ],
    "/": [],

    "/description": [
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Description Selection",
        icon: allAssets["pencil-case.svg"],
        //pencilCase,
        clickHandler: async (event) => {
          await DataProviderNavigate("/product-details");
        },
      },
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Description Assist",
        icon: allAssets["ai-icon.svg"],
        clickHandler: async (event) => {
          await assistRequest(aiWorkStation);
        },
      },
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Clear Description",
        icon: allAssets["clear2.svg"],
        clickHandler: async (event) => {
          await clearAssistResult(aiWorkStation);
        },
      },
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Save Description",
        saveSignal: true,
        icon: allAssets["save.svg"],
        clickHandler: async (event) => {
          await updateArticleMethod(aiWorkStation, markupText);
        },
      },
    ],
    "/article": [
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Description Selection",
        icon: allAssets["pencil-case.svg"],
        clickHandler: async (event) => {
          await DataProviderNavigate("/product-details", { target: "host" });
        },
      },
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Description Assist",
        icon: allAssets["ai-icon.svg"],
        clickHandler: async (event) => {
          await assistRequest(aiWorkStation);
        },
      },
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Clear Description",
        icon: allAssets["clear2.svg"],
        clickHandler: async (event) => {
          await clearAssistResult(aiWorkStation);
        },
      },
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Save Description",
        saveSignal: true,
        icon: allAssets["save.svg"],
        clickHandler: async (event) => {
          await updateArticleMethod(aiWorkStation, markupText);
        },
      },
    ],
    "/product-details": [
      {
        access: checkFeatureAccess(["free"]),
        disabled: false,
        label: "Products Pages",
        icon: allAssets["bookshelf7.svg"],
        clickHandler: async (event) => {
          await DataProviderNavigate("/", { target: "host" });
        },
      },
      {
        access: checkFeatureAccess(["chestnut"]),

        label: "Description Workstation",
        icon: descriptionWorkStation,

        clickHandler: async (event, hasAccess) => {
          if (!hasAccess) {
            await DataProviderNavigate("/subscriptions");
          } else {
            aiWorkStationSetter("description");
            await DataProviderNavigate("/description");
          }
        },
      },
      {
        access: checkFeatureAccess(["sourwood"]),
        label: "Article Workstation",
        icon: newsPaperWorStation,
        clickHandler: async (event, hasAccess) => {
          if (!hasAccess) {
            await DataProviderNavigate("/subscriptions");
          } else {
            aiWorkStationSetter("article");
            await DataProviderNavigate("/article");
          }
        },
      },
    ],
  };

  return (
    <IonReactRouter key="IonReactRouter">
      <IonTabs key="IonTabs">
        <IonRouterOutlet key="IonRouterOutlet">
          <Routes key="Routes">
            <Route
              key="root"
              index
              path="/"
              element={<ProductsCard animationRef={refDictionary["/"]} />}
            />
            <Route
              key="/product-details"
              path="/product-details"
              element={
                <ListDetailComponent
                  animationRef={refDictionary["/product-details"]}
                />
              }
            />
            <Route
              key="/subscriptions"
              path="/subscriptions"
              element={
                <SubscriptionComponent
                  animationRef={refDictionary["/subscriptions"]}
                />
              }
            />
            <Route
              path="/search"
              key="/search"
              element={<Search animationRef={refDictionary["/search"]} />}
            />
            <Route
              key={"/welcome"}
              path="/welcome"
              element={
                <LandingPage
                  key="landingPage"
                  animationRef={refDictionary["/welcome"]}
                />
              }
            />
            <Route
              key="/description"
              path="/description"
              element={<Description />}
            />
            <Route key="/article" path="/article" element={<Article />} />
            <Route key="exitframe" path="/exitiframe" element={<ExitFrame />} />
            <Route
              key="/support-ticket"
              path="/support-ticket"
              element={<BugReportPage />}
            />
            <Route key="noMatch" path="/*" element={<div>No page found</div>} />
          </Routes>
        </IonRouterOutlet>
        <IonTabBar
          translucent={false}
          style={{ "--background": "none" }}
          key="ionTabBar"
          slot="bottom"
        >
          {tabs[currentRoute]?.map((tab, index) => {
            const buttonId = "tabButtonId" + index;

            return (
              <IonTabButton
                size="large"
                id={buttonId}
                disabled={(contentSaved && tab.saveSignal ) ? false :  (lockAllTasks || tab.disabled) }
             color={contentSaved && tab.saveSignal ? "success" : "neural"}
                key={index}
                tab={currentRoute}
                onClick={(e) =>
                  tab.clickHandler(e, tab.access.hasAccess, router)
                }
              >
                <IonIcon
                  color={contentSaved && tab.saveSignal ? "success" : "neural"}
                  key={"icon" + index}
                  src={tab.access.hasAccess && tab.src}
                  icon={!tab.src && tab.access.hasAccess ? tab.icon : beehive}
                  className="custom-icon"
                />
                <IonLabel
                  key={index}
                  color={(contentSaved && tab.saveSignal )? "success" : tab.access.hasAccess ? "primary" : "danger"}
                >
             
                {(contentSaved && tab.saveSignal ) ? "Saving" : tab.access.message(tab.label)}
                </IonLabel>
              </IonTabButton>
            );
          })}
        </IonTabBar>
        <IonButton id="context-menu-trigger">Right-Click Me</IonButton>
        {/* <IonPopover trigger="context-menu-trigger" triggerAction="context-menu">
        <IonContent class="ion-padding">Hello World!</IonContent>
      </IonPopover>
      <IonPopover trigger="context-menu-trigger" triggerAction="click">
        <IonContent class="ion-padding">Hello World!</IonContent>
      </IonPopover> */}
      </IonTabs>
    </IonReactRouter>
  );
}

function IonPopovers() {
  return (
    <IonPopover
      key="Include existing description in composition"
      translucent={true}
      animated="true"
      trigger="acacia-options-select-options-hover-trigger"
      triggerAction="hover"
      area-label="Advanced Language and Formatting Options"
    >
      <IonContent key="popoverContent" className="ion-padding">
        <IonText key="popoverText">
          <p key="pPopoverText">
            Explore Advanced Language and Formatting Choices. Choose your
            preferred categories from the acacia menu options, and they will be
            displayed below.
          </p>
        </IonText>
        <IonText key="popoverTextSecondary" color="secondary">
          <sub key="subText">
            <IonIcon key="exitOutlineIcon" icon={exitOutline}></IonIcon> click
            outside box to close
          </sub>
        </IonText>
      </IonContent>
    </IonPopover>
  );
}
