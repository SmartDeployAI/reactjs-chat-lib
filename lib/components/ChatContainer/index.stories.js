"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _index = require("./index");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var stories = (0, _react3.storiesOf)("ChatContainer", module);
var props = {
  agentProfile: {
    name: "Badewa Kayode",
    id: 1,
    avatar:
      "https://media.licdn.com/dms/image/C4D03AQESwPQ8jCundg/profile-displayphoto-shrink_800_800/0?e=1571270400&v=beta&t=8AofQ4pIflhHnVsCnIydapJqMSdfkvfnpTbrJFy4bPE",
    isOnline: true,
    subtitle: "Admin to YipCart"
  },
  senderProfile: {
    name: "Anifowoshe Gbenga",
    id: 2,
    avatar:
      "https://media.licdn.com/dms/image/C5603AQHnNE6t21CVkg/profile-displayphoto-shrink_100_100/0?e=1571270400&v=beta&t=xVCYMYT-NDlep3QBMewOOQ7LhjgpgsxyfCdPCKtihZQ"
  },
  messages: [
    {
      id: 1,
      type: "text",
      text: "Hey man!!! whats sup Gee",
      createdAt: new Date(),
      user: {
        id: 2
      }
    },
    {
      id: 2,
      type: "emoji",
      text: "😜😜",
      createdAt: new Date(),
      user: {
        id: 1
      }
    },
    {
      id: 3,
      type: "files",
      createdAt: new Date(),
      text: "See this images I found on the net man",
      files: [
        {
          type: "image/jpeg",
          url:
            "https://www.linkedin.com/dms/C5606AQHnrG1lzyn1bQ/messaging-attachmentFile/0?m=AQL7SqYWlc3IOAAAAWyvTxt3LE3qINgtyeTbdrTGHdKbF807l2LoCBYMZQ&ne=1&v=beta&t=cASGzDFbhFRAUxw1SuQR3H7NTgGiqUifNS7QBLvewPs#S6569236250342105088_500"
        },
        {
          type: "image/png",
          url:
            "https://www.linkedin.com/dms/C5606AQGljroNDCzyDw/messaging-attachmentFile/0?m=AQLwBSn-pFpTZgAAAWyvW7bqjX5T12edU7ctAuBeGKeobt-4r6TrkAkPOw&ne=1&v=beta&t=cwKltgOPVG-vper0L_NKBQCe5sA3R9Y-0D5EUHitTME#S6569236169991827457_500"
        }
      ],
      user: {
        id: 2
      }
    }
  ]
};
stories.add("without windows", function() {
  return _react2["default"].createElement(_index.ChatContainer, {
    hashKey: (0, _addonKnobs.text)("hash key", "")
  });
});
stories.add(
  "with initial window",
  function() {
    function Parent(_ref) {
      var children = _ref.children;

      var _useState = (0, _react.useState)({}),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

      return children(state, setState);
    }

    return (
      // <Parent>
      //   {(state, setState) => (
      _react2["default"].createElement(
        _index.ChatContainer,
        {
          onRequestClose: function onRequestClose() {
            return alert("Oya ooo");
          },
          currentAgentId: (0, _addonKnobs.text)("current chat id", "a"),
          rightHorizontalOverlaySpacing: (0, _addonKnobs.number)(
            "right horizontal overlay spacing",
            200
          ),
          hashKey: (0, _addonKnobs.text)("hash key", "")
        },
        function(windows) {
          return windows.map(function(window) {
            var key = window.id;
            var Window = window.component;
            return _react2["default"].createElement(Window, {
              onSend: function onSend(messages) {
                return console.log("gbenga", messages);
              },
              key: key, // filesUploadProps={state.fileUploadProps}
              onProfileClick: function onProfileClick(id) {
                return console.log("The Id is ", id);
              },
              windowDidMount: function windowDidMount(data) {
                return console.log("mount", data);
              },
              windowWillUnmount: function windowWillUnmount(data) {
                return console.log("unmount", data);
              },
              windowDidUpdate: function windowDidUpdate(data) {
                return console.log("update", data);
              }, // onUploadFile={({ id, file }) => {
              //   setState({
              //     fileUploadProps: {
              //       [id]: {
              //         isUploading: true,
              //         progress: 0,
              //         done: false,
              //         error: false,
              //       },
              //     },
              //   });
              // }}
              onRetryFileUpload: function onRetryFileUpload(file) {
                return console.log("retry", file);
              },
              agentProfile: props.agentProfile,
              senderProfile: props.senderProfile,
              messages: (0, _addonKnobs.object)("messages", props.messages)
            });
          });
        }
      ) //   )}
      // </Parent>
    );
  },
  {
    knobs: {
      escapeHTML: false
    }
  }
);
stories.add("with windows", function() {
  return _react2["default"].createElement(
    _index.ChatContainer,
    {
      currentAgentId: (0, _addonKnobs.text)("current chat id", ""),
      hashKey: (0, _addonKnobs.text)("hash key", "")
    },
    function(windows) {
      return windows.map(function(window) {
        var key = window.id;
        var Window = window.component;
        return _react2["default"].createElement(Window, {
          key: key
        });
      });
    }
  );
});
stories.add("with request close function", function() {
  return _react2["default"].createElement(
    _index.ChatContainer,
    {
      onRequestClose: function onRequestClose() {
        return alert("Nah not closing me!!!");
      },
      currentAgentId: (0, _addonKnobs.text)("current chat id", ""),
      hashKey: (0, _addonKnobs.text)("hash key", "")
    },
    function(windows) {
      return windows.map(function(window) {
        var key = window.id;
        var Window = window.component;
        return _react2["default"].createElement(Window, {
          key: key
        });
      });
    }
  );
});
