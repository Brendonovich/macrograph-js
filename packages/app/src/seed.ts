export const graphSeed = {
  nodes: [
    {
      name: "Switch On Int",
      type: "Utilities:Switch:Switch On Int",
      position: {
        x: 259,
        y: 457,
      },
      id: "PY5zM7LIn84uJkV1MgXc3",
      data: {
        "Switch Cases": [36, 37, 38],
      },
      pins: {
        data: {
          in: [
            {
              id: "avyleLMj",
              unconnectedValue: 0,
              connection: {
                node: "YpeVejrQ9K5gS7ahbvHX_",
                pin: "9tgcpgB0",
              },
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "grGOTu1T",
              connection: {
                node: "YpeVejrQ9K5gS7ahbvHX_",
                pin: "gp9P615N",
              },
            },
          ],
          out: ["47lSSggi", "I91LcsrP", "UwxxsCox", "2KGqm7mp"],
        },
      },
    },
    {
      name: "MIDI Note On",
      type: "Midi:Note On",
      position: {
        x: 114,
        y: 458,
      },
      id: "YpeVejrQ9K5gS7ahbvHX_",
      pins: {
        data: {
          in: [],
          out: ["9tgcpgB0", "_OqdJC3g", "ubGnZhGN"],
        },
        exec: {
          in: [],
          out: ["gp9P615N"],
        },
      },
    },
    {
      name: "OBS Set Current Scene",
      type: "OBS:OBS Set Current Scene",
      position: {
        x: 553,
        y: 404,
      },
      id: "0yKZd_BCaJFII5MmhRSmd",
      pins: {
        data: {
          in: [
            {
              id: "S1x4SyWZ",
              unconnectedValue: "Main Scene",
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "rB0wGnKN",
              connection: {
                node: "PY5zM7LIn84uJkV1MgXc3",
                pin: "47lSSggi",
              },
            },
          ],
          out: ["N98nHjUF"],
        },
      },
    },
    {
      name: "OBS Set Current Scene",
      type: "OBS:OBS Set Current Scene",
      position: {
        x: 555,
        y: 525,
      },
      id: "54GekNZzjRhSLx2TgqXu1",
      pins: {
        data: {
          in: [
            {
              id: "rbYxf5p-",
              unconnectedValue: "Hold On",
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "nYcVR5zP",
              connection: {
                node: "PY5zM7LIn84uJkV1MgXc3",
                pin: "I91LcsrP",
              },
            },
          ],
          out: ["qVwtrlZP"],
        },
      },
    },
    {
      name: "OBS Set Current Scene",
      type: "OBS:OBS Set Current Scene",
      position: {
        x: 552,
        y: 645,
      },
      id: "w128Qro_HORykVKTeHHN8",
      pins: {
        data: {
          in: [
            {
              id: "qK-YkEqH",
              unconnectedValue: "End Stream",
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "YGhm7Vjb",
              connection: {
                node: "PY5zM7LIn84uJkV1MgXc3",
                pin: "UwxxsCox",
              },
            },
          ],
          out: ["5kPylKv0"],
        },
      },
    },
  ],
};
