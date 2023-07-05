import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";

function AppTypeahead({
  items,
  selectedItems,
  onSelectionCancel,
  onSelectionChange,
  title,
}) {
  const [filteredItems, setFilteredItems] = useState([...items]);
  const [workingSelectedValues, setWorkingSelectedValues] = useState([
    ...selectedItems,
  ]);

  const isChecked = (value) => {
   
    return workingSelectedValues.find((item) => item === value) !== undefined;
  };

  const cancelChanges = () => {
    
    if (onSelectionCancel !== undefined) {
      onSelectionCancel();
    }
  };

  const confirmChanges = () => {
    
    if (onSelectionChange !== undefined) {
      onSelectionChange(workingSelectedValues);
    }
  };

  const searchbarInput = (ev) => {
    filterList(ev.target.value);
  };

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  const filterList = (searchQuery) => {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined || searchQuery === null) {
      setFilteredItems([...items]);
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery;
      setFilteredItems(
        items.filter((item) => {
          return item.transformedSrc.includes(normalizedQuery);
        })
      );
    }
  };

  const checkboxChange = (ev) => {
    const { checked, value } = ev.detail;
console.log('value', value);
console.log('checked', checked);


    if (checked) {
      setWorkingSelectedValues([...workingSelectedValues, value]);
    } else {
      setWorkingSelectedValues(
        workingSelectedValues.filter((item) => item!== value)
      );
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={confirmChanges}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonInput={searchbarInput}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        <IonList inset={true}>
          {filteredItems.map((item) => {
            // console.log('item',item)
            
            return (
            <IonItem key={item.transformedSrc}>
              <IonCheckbox
                value={item.transformedSrc}
                checked={isChecked(item.transformedSrc)}
                onIonChange={checkboxChange}
              >
              is checked  {isChecked(item.transformedSrc)}
                {/* {item.transformedSrc} */}
              </IonCheckbox>
            </IonItem>
          )
          })}
        </IonList>
      </IonContent>
    </>
  );
}
export default AppTypeahead;
