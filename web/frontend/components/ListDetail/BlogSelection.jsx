import React, { useState, useEffect, useRef, forwardRef } from "react";

import {
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonToast,
  IonText,
  IonAlert,
  useIonAlert,
  useIonToast,
  IonItem,
  IonIcon,
  IonPopover,
  IonContent,
} from "@ionic/react";
import { useAuthenticatedFetch, useAppBridge } from "@shopify/app-bridge-react";
import {
  informationCircleOutline,
  exitOutline,
  informationCircle,
} from "ionicons/icons";
import {
  useDataProvidersContext,
  stableFetchComponent,
  DataFetchingComponent,
} from "../../components";

function HumanReadableDate(ISO_8601) {
  const date = new Date(ISO_8601);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const humanReadableDate = date.toLocaleString("en-US", options);
  return humanReadableDate;
}

const BlogSelection = forwardRef(({ article, currentBox }, ref) => {
  const fetch = useAuthenticatedFetch();
  const [presentToast] = useIonToast();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newArticleName, setNewArticleName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [presentAlert] = useIonAlert();
  const { async_fetchData } = useDataProvidersContext();
  const showReceptModal = (selectedArticle) => {
    presentAlert({
      header: `Article Post Confirmation: `,
      message: `Blog ID:  ${selectedArticle.blog_id},
       Blog Handle:  ${selectedArticle.handle},
      \nArticle Title: ${ selectedArticle.title},
      \nArticle ID:  ${selectedArticle.id},
      \nCreated At: ${HumanReadableDate(selectedArticle.created_at)},
      \nPublished At: ${HumanReadableDate(selectedArticle.published_at)},
      \nUpdated At: ${HumanReadableDate(selectedArticle.updated_at)}.`,
      buttons: ["OK"],
    });
  };
  const handleAddArticle = async () => {
    try {
      const blog = selectedBlog || newBlogTitle;
  
      if (!blog || !article || !article.length || !newArticleName || !newArticleName.length) {
        return;
      }
  
      let blogData = selectedBlog || {};
  
      if (newBlogTitle) {
        const { data, error } = await createBlog(newBlogTitle);
  
        if (error === null) {
          console.log("data blog creation", data);
          setSelectedBlog(data);
        } else {
          handleNetworkError();
          return;
        }
  
        blogData = data;
      }
  
      const { id: blog_id, title } = blogData;
      const body_html = article;
      const published = true;
      const author = "";
  
      const { data, error } = await createArticle(blog_id, title, author, body_html, published);
  
      console.log('ceated artice',data);
      console.log('article creation', error)
  
      if (error === null) {
        console.log("data article creation", data);
        showReceptModal(data);
      } else {
        handleNetworkError();
      }
    } catch (error) {
      console.error("Error while adding article:", error);
      handleUnexpectedError();
    }
  };
  
  const handleNetworkError = () => {
    presentToast({
      message: "There was a network error! Please try again later.",
      duration: 5000,
      position: "middle", // top, bottom, middle
      onDidDismiss: () => setDisableButtons(false),
    });
  };
  
  const handleUnexpectedError = () => {
    presentToast({
      message: "An unexpected error occurred. Please try again later.",
      duration: 5000,
      position: "middle",
      onDidDismiss: () => setDisableButtons(false),
    });
  };
  

  // Expose the handleChildAction function using the ref
  // Now the parent can call this function through the childRef
  React.useImperativeHandle(ref, () => ({
    handleAddArticle,
  }));

  async function createBlog(title) {
    const body = { title };
    return await async_fetchData(
      {
        url: "/api/blog/create",
        method: "POST",
        body,
      },
      fetch
    );
  }

  async function createArticle(blog_id, title, author, body_html, published) {
    console.log("has properties ");

    const createArticleBody = { blog_id, title, author, body_html, published };
    return await async_fetchData({
      url: "/api/article/create",
      method: "POST",
      body: createArticleBody,
    });
  }

  let {
    data: blogList,
    loading,
    error,
  } = DataFetchingComponent({ url: "/api/blog/list" });

  // console.log('error---->', error)

  const handleBlogChange = (event) => {
    const selectedBlog = event.target.value;
    setSelectedBlog(selectedBlog);
    setNewBlogTitle("");
  };

  const handleNewBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleNewArticleNameChange = (event) => {
    setNewArticleName(event.target.value);
  };

  const handleCreateNewBlog = () => {
    // Implement the logic to create a new blog using `newBlogTitle`
  };

  const handleSelectExistingBlog = () => {
    if (selectedBlog) {
      onSelectBlog(selectedBlog);
      setToastMessage("Existing blog selected!");
      setShowToast(true);
    }
  };

  const handleBlogSelectCancel = (e) => {
    setSelectedBlog(null);
  };

  const customAlertOptions = {
    header: "Blog Handle",
    subHeader: "Select The Blog You Want to Publish To.",
    message: "Choose only one",
    translucent: true,
  };

  return (
    <IonCol size="12">
      <IonItem lines="none" color="light">
        <IonRow>
          {blogList.length ? (
            <IonCol size="6">
              <IonSelect
                placeholder="Select Blog"
                value={selectedBlog}
                interface="action-sheet"
                labelPlacement="start"
                interfaceOptions={customAlertOptions}
                cancelText="Cancel Selection"
                okText="Select Blog"
                selectedText={selectedBlog?.handle}
                onIonCancel={handleBlogSelectCancel}
                onIonChange={handleBlogChange}
              >
                {blogList.map((blog) => (
                  <IonSelectOption key={blog?.id} value={blog}>
                    {blog?.handle}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          ) : (
            <IonCol size="6">
              <IonText color="danger">You have no Blogs.</IonText>
            </IonCol>
          )}
          <IonCol size="6">
            {" "}
            <IonItem color="light" lines="none">
              <IonIcon
                className={currentBox === "article" ? "" : "ion-hide"}
                size="small"
                color="secondary"
                slot="end"
                aria-label="Include existing description in composition"
                id={"article-post-validation" + currentBox}
                icon={informationCircleOutline}
              ></IonIcon>
              <IonPopover
                key={"Include existing description in composition"}
                translucent={true}
                animated="true"
                trigger={"article-post-validation" + currentBox}
                triggerAction="hover"
                ionPopoverWillPresent={(e) => console.log("i will pop")}
              >
                <IonContent className="ion-padding">
                  <IonText>
                    <p>
                      Save your articles to a blog. Name your article, and
                      select an existing blog or create a new one if none exist.
                    </p>
                  </IonText>
                  <IonText color="secondary">
                    <sub>
                      <IonIcon icon={exitOutline}></IonIcon> click outside box
                      to close
                    </sub>
                  </IonText>
                </IonContent>
              </IonPopover>{" "}
            </IonItem>
          </IonCol>
          <IonCol size="6">
            <IonInput
              type="text"
              placeholder="Enter new blog title"
              value={newBlogTitle}
              onIonChange={handleNewBlogTitleChange}
              disabled={selectedBlog !== null}
            />
          </IonCol>
          <IonCol size="6">
            <IonInput
              type="text"
              placeholder="Enter new article name"
              value={newArticleName}
              onIonChange={handleNewArticleNameChange}
            />
          </IonCol>
          <IonCol></IonCol>

          <IonToast
            isOpen={showToast}
            message={toastMessage}
            onDidDismiss={() => setShowToast(false)}
          />
        </IonRow>
      </IonItem>
    </IonCol>
  );
});
export { BlogSelection };
