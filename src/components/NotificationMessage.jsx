function NotificationMessage({ message }) {
    if (message.text === null) {
      return null;
    }
    return (
      <div className={` ${message.type === "success" ? "success" : "error"}`}>
        {message.text}
      </div>
    );
  }
  export default NotificationMessage;
