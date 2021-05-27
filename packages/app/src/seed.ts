export const graphSeed = {
  nodes: [
    {
      name: "Note On",
      type: "Midi:Note On",
      position: {
        x: 90,
        y: 267,
      },
      id: "L8TN3w7FEeDVXKzGAEOry",
      data: [],
      pins: {
        data: {
          in: [],
          out: ["Nwn3R9vc", "ybx66nVd", "s4zdi3N2"],
        },
        exec: {
          in: [],
          out: ["656OlLK6"],
        },
      },
    },
    {
      name: "Switch On Int",
      type: "Utilities:Switch:Switch On Int",
      position: {
        x: 230,
        y: 261,
      },
      id: "iG9JTEUbOfWvSpUSJJlyE",
      data: [[36, 37, 38]],
      pins: {
        data: {
          in: [
            {
              id: "vbbqvw7u",
              unconnectedValue: 0,
              connection: {
                node: "L8TN3w7FEeDVXKzGAEOry",
                pin: "Nwn3R9vc",
              },
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "40K_pdMG",
              connection: {
                node: "L8TN3w7FEeDVXKzGAEOry",
                pin: "656OlLK6",
              },
            },
          ],
          out: ["eaKvniPN", "trzgSmDk", "TT2wQcLs", "im4YuplX"],
        },
      },
    },
    {
      name: "OBS Set Current Scene",
      type: "OBS:OBS Set Current Scene",
      position: {
        x: 572,
        y: 407,
      },
      id: "A5mCU7oQYtoP40t_7VN57",
      data: [],
      pins: {
        data: {
          in: [
            {
              id: "FRAi4H0y",
              unconnectedValue: "camera",
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "MgGFkxlz",
              connection: {
                node: "iG9JTEUbOfWvSpUSJJlyE",
                pin: "TT2wQcLs",
              },
            },
          ],
          out: ["dVkg24kG"],
        },
      },
    },
    {
      name: "OBS Set Current Scene",
      type: "OBS:OBS Set Current Scene",
      position: {
        x: 580,
        y: 160,
      },
      id: "4PGjQ_xbQuU0Br8HbB1Ea",
      data: [],
      pins: {
        data: {
          in: [
            {
              id: "JT8BpzJT",
              unconnectedValue: "Main Scene",
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "TMOjMyde",
              connection: {
                node: "iG9JTEUbOfWvSpUSJJlyE",
                pin: "eaKvniPN",
              },
            },
          ],
          out: ["pqV1viw1"],
        },
      },
    },
    {
      name: "OBS Set Current Scene",
      type: "OBS:OBS Set Current Scene",
      position: {
        x: 569,
        y: 284,
      },
      id: "Zd2MlRL58RRZ4iufrPOOi",
      data: [],
      pins: {
        data: {
          in: [
            {
              id: "LiQLaA9l",
              unconnectedValue: "main scene",
            },
          ],
          out: [],
        },
        exec: {
          in: [
            {
              id: "JeVTPKkh",
              connection: {
                node: "iG9JTEUbOfWvSpUSJJlyE",
                pin: "trzgSmDk",
              },
            },
          ],
          out: ["pPVZl6TO"],
        },
      },
    },
  ],
};
