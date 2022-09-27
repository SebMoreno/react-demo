export default (
  jsSrc: string,
  id: string,
  asyncProp = true,
  deferProp = true
) => {
  return new Promise((resolve, reject) => {
    let js = document.createElement("script");
    js.id = id;
    js.src = jsSrc;
    js.async = asyncProp;
    js.defer = deferProp;
    const clean = () => document.getElementById(id)?.remove();
    js.onload = (e) => {
      resolve(e);
      clean();
    };
    js.onerror = (e) => {
      reject(e);
      clean();
    };
    const el = document.getElementsByTagName("script")[0];
    if (el?.parentNode) {
      el.parentNode.insertBefore(js, el);
    } else {
      document.head.appendChild(js);
    }
  });
};
