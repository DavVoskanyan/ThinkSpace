class WindowAlerter {
  static NOTIFICATIONS_CONTAINER;
  #ERROR_SVG_FILE_NAME = 'xMark';
  #SUCCESS_SVG_FLE_NAME = 'checkMark';

  constructor(notificationContainerParentElement) {
    WindowAlerter.NOTIFICATIONS_CONTAINER = WindowAlerter.NOTIFICATIONS_CONTAINER ?? WindowAlerter.#createNotificationContainer(notificationContainerParentElement);
  }
  static #createNotificationContainer(notificationContainerParentElement) {
    const container = document.createElement('div');
    container.classList.add('notificationsContainer');
    container.innerHTML = "<h2 class='notificationsTitle'>Notifications</h2>"



    if(notificationContainerParentElement) {
      notificationContainerParentElement.appendChild(container);
    }
    else { console.error(`WindowAlerterError: Parent Element is ${notificationContainerParentElement}`) }
    return container;
  }

  alertDivConstructor(alertType, alertText) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alertWindow');

    alertDiv.appendChild(this.#createWindowIcon(alertType));
    alertDiv.appendChild(this.#createWindowText(alertText));

    WindowAlerter.NOTIFICATIONS_CONTAINER.appendChild(alertDiv);

    setTimeout(() => {this.#moveToList(alertDiv)}, 4000);
  }

  #getFileNameByAlertType(alertType) {
    return alertType.trim().toLowerCase() === 'success' ? this.#SUCCESS_SVG_FLE_NAME : this.#ERROR_SVG_FILE_NAME;
  }

  #createWindowIcon(alertType) {
    const windowIcon = document.createElement('img');
    windowIcon.src = `/assets/icons/${this.#getFileNameByAlertType(alertType)}.svg`;
    windowIcon.alt = this.#getFileNameByAlertType(alertType);
    windowIcon.classList.add('alertIcon', alertType.trim().toLowerCase());

    return windowIcon;
  }

  #createWindowText(alertText) {
    const windowText = document.createElement('span');
    windowText.innerText = alertText;
    windowText.classList.add('windowText');

    return windowText;
  }

  #moveToList(alertWindow) {
    alertWindow.classList.add('removed');

    setTimeout(() => {
      alertWindow.classList.remove('removed');
      alertWindow.classList.add('addedToList');
    }, 150)
  }
}


export default WindowAlerter;
