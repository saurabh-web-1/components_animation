const stage = document.getElementById("stage");
const plug = document.getElementById("plug");

const socket = document.getElementById("socket");
const magneticTarget =
  document.getElementById("magneticTarget");

const socketBody =
  document.getElementById("socketBody");

const plugConnector =
  document.getElementById("plugConnector");

const cableOuter =
  document.getElementById("cableOuter");

const cableHighlight =
  document.getElementById("cableHighlight");

const cableShadow =
  document.getElementById("cableShadow");

const connectionFlash =
  document.getElementById("connectionFlash");

const actionButton =
  document.getElementById("actionButton");

const actionText =
  document.getElementById("actionText");

const loadingSpinner =
  document.getElementById("loadingSpinner");

const instruction =
  document.getElementById("instruction");

const routePage =
  document.querySelector(".route-page");

const homeButton =
  document.getElementById("homeButton");

const PLUG_BODY = {
  width: 112,
  height: 74
};

const PLUG_TOTAL = {
  width: 130,
  height: 74
};

const SNAP_DISTANCE = 125;

let geometry = null;

let plugPosition = {
  x: 0,
  y: 0
};

let connected = false;
let connecting = false;
let inserting = false;
let dragging = false;
let nearSocket = false;

let pointerId = null;

let grabOffset = {
  x: PLUG_TOTAL.width / 2,
  y: PLUG_TOTAL.height / 2
};

let timer = null;

function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}

function updateGeometry() {
  const rect =
    stage.getBoundingClientRect();

  const width = rect.width;
  const height = rect.height;

  const groundY =
    height - 23;

  const socketPoint = {
    x:
      width -
      Math.max(92, width * 0.065),

    y:
      height * 0.53
  };

  const socketOpeningWidth = 58;

  const socketOpeningLeft =
    socketPoint.x -
    socketOpeningWidth / 2;

  const connectedPlug = {
    x:
      socketOpeningLeft -
      PLUG_BODY.width +
      8,

    y:
      socketPoint.y -
      PLUG_BODY.height / 2
  };

  const preInsertPlug = {
    x:
      connectedPlug.x - 22,

    y:
      connectedPlug.y
  };

  const disconnectedPlug = {
    x:
      Math.max(70, width * 0.22),

    y:
      groundY -
      PLUG_BODY.height +
      2
  };

  geometry = {
    width,
    height,
    groundY,
    socket: socketPoint,
    socketOpeningLeft,
    connectedPlug,
    preInsertPlug,
    disconnectedPlug
  };

  if (
    plugPosition.x === 0 &&
    plugPosition.y === 0
  ) {
    plugPosition = {
      ...disconnectedPlug
    };
  }

  positionPlug();
  positionSocket();
  updateCable();
}

function positionSocket() {
  if (!geometry) return;

  socket.style.left =
    `${geometry.socket.x - 9}px`;

  socket.style.top =
    `${geometry.socket.y - 100}px`;

  magneticTarget.style.left =
    `${geometry.socket.x - 58}px`;

  magneticTarget.style.top =
    `${geometry.socket.y - 58}px`;

  connectionFlash.style.left =
    `${geometry.socket.x - 5}px`;

  connectionFlash.style.top =
    `${geometry.socket.y - 5}px`;
}

function positionPlug() {
  plug.style.left =
    `${plugPosition.x}px`;

  plug.style.top =
    `${plugPosition.y}px`;
}

function updateCable() {
  if (!geometry) return;

  const cableStart = {
    x: 22,
    y: geometry.groundY
  };

  const cableEnd = {
    x: plugPosition.x + 2,
    y:
      plugPosition.y +
      PLUG_BODY.height / 2
  };

  const horizontalDistance =
    Math.max(
      80,
      cableEnd.x -
      cableStart.x
    );

  const bend =
    Math.min(
      280,
      Math.max(
        110,
        horizontalDistance * 0.34
      )
    );

  const path = `
    M ${cableStart.x} ${cableStart.y}
    C ${cableStart.x + 165} ${cableStart.y},
      ${cableEnd.x - bend} ${cableEnd.y + 108},
      ${cableEnd.x} ${cableEnd.y}
  `;

  cableShadow.setAttribute(
    "d",
    path
  );

  cableOuter.setAttribute(
    "d",
    path
  );

  cableHighlight.setAttribute(
    "d",
    path
  );
}

function updatePlugRotation() {
  let rotation = 0;

  if (connected) {
    rotation = 0;
  } else if (nearSocket) {
    rotation = -1;
  } else if (dragging) {
    rotation = -2;
  }

  plug.style.setProperty(
    "--plug-rotation",
    `${rotation}deg`
  );

  if (!dragging) {
    plug.style.transform =
      `rotate(${rotation}deg) scale(1)`;
  }
}

function movePlug(x, y) {
  plugPosition = {
    x,
    y
  };

  positionPlug();
  updateCable();
  updatePlugRotation();
}

function getSocketDistance() {
  if (!geometry) {
    return Infinity;
  }

  const centerX =
    plugPosition.x +
    PLUG_TOTAL.width / 2;

  const centerY =
    plugPosition.y +
    PLUG_TOTAL.height / 2;

  return Math.hypot(
    centerX - geometry.socket.x,
    centerY - geometry.socket.y
  );
}

function connect() {
  if (
    !geometry ||
    connected ||
    connecting
  ) {
    return;
  }

  dragging = false;
  nearSocket = false;

  connecting = true;
  inserting = false;

  magneticTarget.classList.remove(
    "visible"
  );

  plug.classList.add(
    "connecting"
  );

  movePlug(
    geometry.preInsertPlug.x,
    geometry.preInsertPlug.y
  );

  clearTimeout(timer);

  timer = setTimeout(() => {

    inserting = true;

    plug.classList.remove(
      "connecting"
    );

    plug.classList.add(
      "inserting"
    );

    movePlug(
      geometry.connectedPlug.x,
      geometry.connectedPlug.y
    );

    timer = setTimeout(() => {

      connected = true;
      connecting = false;
      inserting = false;

      plug.classList.remove(
        "inserting"
      );

      plug.classList.add(
        "connected"
      );

      routePage.classList.add(
        "connected"
      );

      actionText.textContent =
        "Unplug it";

      instruction.classList.add(
        "hidden"
      );

      plug.setAttribute(
        "aria-label",
        "Drag plug to disconnect"
      );

      connectionFlash.classList.remove(
        "show"
      );

      void connectionFlash.offsetWidth;

      connectionFlash.classList.add(
        "show"
      );

      timer = setTimeout(() => {
        connectionFlash.classList.remove(
          "show"
        );
      }, 320);

    }, 420);

  }, 430);
}

function disconnect() {
  if (
    !geometry ||
    connecting
  ) {
    return;
  }

  connected = false;
  connecting = false;
  inserting = false;
  dragging = false;
  nearSocket = false;

  clearTimeout(timer);

  plug.classList.remove(
    "connected",
    "inserting",
    "connecting"
  );

  routePage.classList.remove(
    "connected"
  );

  instruction.classList.remove(
    "hidden"
  );

  actionText.textContent =
    "Plug it back in";

  plug.setAttribute(
    "aria-label",
    "Drag plug into socket"
  );

  movePlug(
    geometry.disconnectedPlug.x,
    geometry.disconnectedPlug.y
  );
}

function handlePointerDown(event) {
  if (
    !geometry ||
    connecting
  ) {
    return;
  }

  pointerId =
    event.pointerId;

  const rect =
    stage.getBoundingClientRect();

  const pointerX =
    event.clientX -
    rect.left;

  const pointerY =
    event.clientY -
    rect.top;

  grabOffset = {
    x:
      pointerX -
      plugPosition.x,

    y:
      pointerY -
      plugPosition.y
  };

  if (connected) {

    connected = false;
    inserting = false;

    routePage.classList.remove(
      "connected"
    );

    actionText.textContent =
      "Plug it back in";

    instruction.classList.remove(
      "hidden"
    );

    plug.classList.remove(
      "connected"
    );

    plugPosition = {
      x:
        geometry.connectedPlug.x - 68,

      y:
        geometry.connectedPlug.y
    };

    positionPlug();
    updateCable();
  }

  dragging = true;

  plug.classList.add(
    "dragging"
  );

  plug.setPointerCapture(
    event.pointerId
  );

  event.preventDefault();
}

function handlePointerMove(event) {
  if (
    !dragging ||
    !geometry
  ) {
    return;
  }

  const rect =
    stage.getBoundingClientRect();

  const pointerX =
    event.clientX -
    rect.left;

  const pointerY =
    event.clientY -
    rect.top;

  const x = clamp(
    pointerX - grabOffset.x,
    22,
    geometry.width -
      PLUG_TOTAL.width -
      22
  );

  const y = clamp(
    pointerY - grabOffset.y,
    30,
    geometry.height -
      PLUG_TOTAL.height -
      5
  );

  movePlug(x, y);

  const distance =
    getSocketDistance();

  nearSocket =
    distance <
    SNAP_DISTANCE;

  if (nearSocket) {
    magneticTarget.classList.add(
      "visible"
    );
  } else {
    magneticTarget.classList.remove(
      "visible"
    );
  }

  plug.style.transform =
    "rotate(-2deg) scale(1.025)";

  event.preventDefault();
}

function handlePointerUp(event) {
  if (!dragging) {
    return;
  }

  dragging = false;

  plug.classList.remove(
    "dragging"
  );

  const distance =
    getSocketDistance();

  if (
    distance <
    SNAP_DISTANCE
  ) {
    connect();
  } else {
    nearSocket = false;

    magneticTarget.classList.remove(
      "visible"
    );

    updatePlugRotation();
  }

  if (
    pointerId !== null
  ) {
    try {
      plug.releasePointerCapture(
        pointerId
      );
    } catch (error) {}
  }

  pointerId = null;
}

plug.addEventListener(
  "pointerdown",
  handlePointerDown
);

plug.addEventListener(
  "pointermove",
  handlePointerMove
);

plug.addEventListener(
  "pointerup",
  handlePointerUp
);

plug.addEventListener(
  "pointercancel",
  handlePointerUp
);

actionButton.addEventListener(
  "click",
  () => {

    if (connecting) {
      return;
    }

    if (connected) {
      disconnect();
    } else {
      connect();
    }

  }
);

homeButton.addEventListener(
  "click",
  () => {
    window.location.href = "/";
  }
);

plug.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      if (connected) {
        disconnect();
      } else {
        connect();
      }

    }

  }
);

window.addEventListener(
  "resize",
  () => {

    updateGeometry();

  }
);

updateGeometry();