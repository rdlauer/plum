const topmost = require('tns-core-modules/ui/frame').topmost;

let closeCallback;

exports.onShownModally = function(args) {
  const modal = args.object;
  /* now you can do modal.getViewById("<id of element>"); */
  const context = args.context; // The context that was passed to this modal

  console.log('Context passed was: ');
  console.log(JSON.stringify(context));

  closeCallback = args.closeCallback; // The closecallback method, which you can call to close the modal
};

exports.close = function(args) {
  const page = topmost().currentPage;
  if (page && page.modal) {
    page.modal.closeModal();
    /* The closecallback still does get called, so you need to handle it
           you can also simply call closeCallback() by passing nothing to close the modal
           this is just an alternate way */
  }
};

exports.submit = function(args) {
  closeCallback('pass your data from here to receive it in the parent page');
};
