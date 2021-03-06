#  Author:  Brian Andrews
#  Winter 2022 Software Engineering CS 361
#  Description:  Generates a pseudorandom number to pick a planet name then writes the planet name to a file.
#  Citation:  List of 684 planets to select randomly from are from:
#             URL:  https://www.imagineforest.com/blog/planet-name-generator/

import random
import time


def name_generator():
    """
    Reads the name_generator_service.txt file and if the file contains text "run" it generates a random number and replaces
    the text in the file with a randomly generated planet name.
    :return:  No return value.
    """

    # Dictionary of planet names
    planet_names = {
        0: "Achelous",
        1: "Oceanu",
        2: "Siren",
        3: "Acheron",
        4: "Achilles",
        5: "Actaeon",
        6: "Admetus",
        7: "Adoni",
        8: "Aeacus",
        9: "AeÃ«tes",
        10: "Aegisthus",
        11: "Aegyptus",
        12: "Aeneas",
        13: "Aeolus",
        14: "Asclepiu",
        15: "Agamemnon",
        16: "Aglaia",
        17: "Ajax",
        18: "Alcestis",
        19: "Alcyone",
        20: "Pleiades",
        21: "Furies",
        22: "Althaea",
        23: "Amazons",
        24: "Ero",
        25: "Amphion",
        26: "Amphitrite",
        27: "Amphitryon",
        28: "Anchises",
        29: "Andromache",
        30: "Andromeda",
        31: "Anteros",
        32: "Antigone",
        33: "AntinoÃ¼s",
        34: "Venus",
        35: "Apollo",
        36: "Aquilo",
        37: "Arachne",
        38: "Mars",
        39: "Argo",
        40: "Argus",
        41: "Ariadne",
        42: "Arion",
        43: "Artemis",
        44: "Asclepius",
        45: "Astarte",
        46: "Sterop",
        47: "Astraea",
        48: "Atalanta",
        49: "Minerva",
        50: "Atlas",
        51: "Atreus",
        52: "Atropos",
        53: "Fates",
        54: "Eo",
        55: "Auster",
        56: "Avernus",
        57: "Dionysu",
        58: "Bellerophon",
        59: "Bellona",
        60: "Boreas",
        61: "Cadmus",
        62: "Calliope",
        63: "Muses",
        64: "Calypso",
        65: "Cassandra",
        66: "Castor",
        67: "Centaurs",
        68: "Cephalus",
        69: "Cepheus",
        70: "Cerberus",
        71: "Demete",
        72: "Chaos",
        73: "Charon",
        74: "Charybdis",
        75: "Chiron",
        76: "Chryseis",
        77: "Circe",
        78: "Clio",
        79: "Clotho",
        80: "Clytemnestra",
        81: "Saturn",
        82: "Cyclopes",
        83: "Daedalus",
        84: "Danae",
        85: "DanaÃ¯des",
        86: "DanaÃ¼s",
        87: "Daphne",
        88: "Graeae",
        89: "Ceres",
        90: "Artemi",
        91: "Dido",
        92: "Diomedes",
        93: "Dione",
        94: "Bacchus",
        95: "Dioscuri",
        96: "Plut",
        97: "Hade",
        98: "Dryads",
        99: "Echo",
        100: "Electra",
        101: "Endymion",
        102: "Enyo",
        103: "Eos",
        104: "Aurora",
        105: "Erato",
        106: "Erebus",
        107: "Eris",
        108: "Eros",
        109: "Eteocles",
        110: "Euphrosyne",
        111: "Europa",
        112: "Eurus",
        113: "Gorgons",
        114: "Eurydice",
        115: "Eurystheus",
        116: "Euterpe",
        117: "Fauns",
        118: "Faunus",
        119: "Pa",
        120: "Favonius",
        121: "Flora",
        122: "Fortuna",
        123: "Gaea",
        124: "Galatea",
        125: "Ganymede",
        126: "Golden Fleece",
        127: "Graces",
        128: "Hades",
        129: "Hamadryads",
        130: "Harpies",
        131: "Juventas",
        132: "Hecate",
        133: "Hector",
        134: "Hecuba",
        135: "Helen",
        136: "Helios",
        137: "Sol",
        138: "Vulcan",
        139: "Hera",
        140: "Juno",
        141: "Hercules",
        142: "Mercury",
        143: "Hero",
        144: "Hesperus",
        145: "Hestia",
        146: "Vesta",
        147: "Hippolyte",
        148: "Amazon",
        149: "Hippolytus",
        150: "Hippomenes",
        151: "Hyacinthus",
        152: "Hydra",
        153: "Hyperion",
        154: "Hypnos",
        155: "Somnus",
        156: "Iapetus",
        157: "Icarus",
        158: "Io",
        159: "Iobates",
        160: "Iphigenia",
        161: "Iris",
        162: "Ismene",
        163: "Ixion",
        164: "Janus",
        165: "Jocasta",
        166: "Zeu",
        167: "Heb",
        168: "Laius",
        169: "LaocoÃ¶n",
        170: "Lares",
        171: "Let",
        172: "Lavinia",
        173: "Leda",
        174: "Lethe",
        175: "Leto",
        176: "Latona",
        177: "Maia",
        178: "Manes",
        179: "Marsyas",
        180: "Medea",
        181: "Medusa",
        182: "Meleager",
        183: "Melpomene",
        184: "Memnon",
        185: "Menelaus",
        186: "Mentor",
        187: "Herme",
        188: "Merope",
        189: "Midas",
        190: "Athen",
        191: "Minos",
        192: "Minotaur",
        193: "Mnemosyne",
        194: "Muse",
        195: "Momus",
        196: "Morpheus",
        197: "Thanato",
        198: "Naiads",
        199: "Napaeae",
        200: "Narcissus",
        201: "Nemesis",
        202: "Neoptolemus",
        203: "Poseido",
        204: "Nestor",
        205: "Nike",
        206: "Niobe",
        207: "Notus",
        208: "Ny",
        209: "Nymphs",
        210: "Nyx",
        211: "Oceanids",
        212: "Oceanus",
        213: "Odysseus",
        214: "Ulysses",
        215: "Oedipus",
        216: "Oenone",
        217: "Rhe",
        218: "Orestes",
        219: "Furie",
        220: "Orion",
        221: "Orpheus",
        222: "Pan",
        223: "Pandora",
        224: "Parcae",
        225: "Paris",
        226: "Patroclus",
        227: "Pegasus",
        228: "Pelias",
        229: "Pelops",
        230: "Penates",
        231: "Penelope",
        232: "Persephone",
        233: "Proserpine",
        234: "Perseus",
        235: "Phaedra",
        236: "Phaethon",
        237: "Philoctetes",
        238: "Phineus",
        239: "Phlegethon",
        240: "Pirithous",
        241: "Pluto",
        242: "Pollux",
        243: "Polyhymnia",
        244: "Polymnia",
        245: "Polynices",
        246: "Polyphemus",
        247: "Polyxena",
        248: "Pontus",
        249: "Poseidon",
        250: "Neptune",
        251: "Priam",
        252: "Priapus",
        253: "Procrustes",
        254: "Prometheus",
        255: "Persephon",
        256: "Proteus",
        257: "Psyche",
        258: "Pygmalion",
        259: "Pyramus",
        260: "Python",
        261: "Quirinus",
        262: "Rhadamanthus",
        263: "Rhea",
        264: "Ops",
        265: "Romulus",
        266: "Sarpedon",
        267: "Cronu",
        268: "Satyrs",
        269: "Scylla",
        270: "Selene",
        271: "Semele",
        272: "Sileni",
        273: "Silvanus",
        274: "Sirens",
        275: "Sisyphus",
        276: "Helio",
        277: "Hypno",
        278: "Sphinx",
        279: "Styx",
        280: "Symplegades",
        281: "Syrinx",
        282: "Tantalus",
        283: "Tartarus",
        284: "Telemachus",
        285: "Tellus",
        286: "Terminus",
        287: "Terpsichore",
        288: "Thalia",
        289: "Thanatos",
        290: "Mors",
        291: "Themis",
        292: "Theseus",
        293: "Thisbe",
        294: "Thyestes",
        295: "Tiresias",
        296: "Titans",
        297: "Tithonus",
        298: "Triton",
        299: "Turnus",
        300: "Odysseu",
        301: "Urania",
        302: "Uranus",
        303: "Aphrodit",
        304: "Hesti",
        305: "Hephaestu",
        306: "Zephyrus",
        307: "Jupiter",
        308: "Dwarf Planets",
        309: "Aeternae",
        310: "Alcyoneus",
        311: "giant",
        312: "Almops",
        313: "Poseidon",
        314: "Helle",
        315: "Aloadae",
        316: "Ares",
        317: "Amphisbaena",
        318: "Arae",
        319: "Argus",
        320: "Asterius",
        321: "Athos",
        322: "Briareus",
        323: "Catoblepas",
        324: "Centaur",
        325: "Centauride",
        326: "Agrius",
        327: "Heracles",
        328: "Amycus",
        329: "Centauromachy",
        330: "Asbolus",
        331: "Bienor",
        332: "Centaurus",
        333: "Chiron",
        334: "heroes",
        335: "Chthonius",
        336: "Nestor",
        337: "Pirithous",
        338: "Hippodamia",
        339: "Cyllarus",
        340: "Dictys",
        341: "Elatus",
        342: "Eurynomos",
        343: "Eurytion",
        344: "Eurytus",
        345: "Lapiths",
        346: "Hylaeus",
        347: "Atalanta",
        348: "Hylonome",
        349: "Nessus",
        350: "Perimedes",
        351: "PhÃ³los",
        352: "Pholus",
        353: "Rhaecus",
        354: "Thaumas",
        355: "Cyprus",
        356: "Lamos",
        357: "Zeus",
        358: "Dionysus",
        359: "Hera",
        360: "Amphithemis",
        361: "Cerastes",
        362: "Cerberus",
        363: "Hades",
        364: "Cetus",
        365: "Ceuthonymus",
        366: "Menoetius",
        367: "Charon",
        368: "Styx",
        369: "Charybdis",
        370: "Chimera",
        371: "Crocotta",
        372: "Cyclopes",
        373: "Arges",
        374: "Gaia",
        375: "Uranus",
        376: "Tartarus",
        377: "Polyphemus",
        378: "Hephaestus",
        379: "Daemons",
        380: "Ceramici",
        381: "Damysus",
        382: "Thrace",
        383: "Dryad",
        384: "Echion",
        385: "Eidolon",
        386: "Empusa",
        387: "Enceladus",
        388: "Athena",
        389: "Erinyes",
        390: "Cronus",
        391: "Virgil",
        392: "Alecto",
        393: "Megaera",
        394: "Tisiphone",
        395: "Gegenees",
        396: "Gello",
        397: "Geryon",
        398: "Gigantes",
        399: "Gorgons",
        400: "Euryale",
        401: "Medusa",
        402: "Stheno",
        403: "Graeae",
        404: "Griffin",
        405: "Harpies",
        406: "Aello",
        407: "Celaeno",
        408: "Ocypete",
        409: "Hecatonchires",
        410: "Hippalectryon",
        411: "Hippocampus",
        412: "Lernaean Hydra",
        413: "Lerna",
        414: "Labour",
        415: "Ichthyocentaurs",
        416: "Ipotane",
        417: "Keres",
        418: "Achlys",
        419: "Kobaloi",
        420: "Laestrygonians",
        421: "Antiphates",
        422: "Manticore",
        423: "Mimas",
        424: "Minotaur",
        425: "Theseus",
        426: "Hellhound",
        427: "Orthrus",
        428: "Odontotyrannos",
        429: "Onocentaur",
        430: "Ophiotaurus",
        431: "Orion",
        432: "Ouroboros",
        433: "Pallas",
        434: "Panes",
        435: "Periboea",
        436: "Giantess",
        437: "Phoenix",
        438: "Polybotes",
        439: "Porphyrion",
        440: "Satyrs",
        441: "Satyresses",
        442: "Pan",
        443: "Agreus",
        444: "Ampelos",
        445: "Marsyas",
        446: "Nomios",
        447: "Silenus",
        448: "Scylla",
        449: "nereid",
        450: "Circe",
        451: "Sirens",
        452: "Medea",
        453: "PasiphaÃ«",
        454: "Argo",
        455: "Sphinx",
        456: "Hieracosphinx",
        457: "Taraxippi",
        458: "Thoon",
        459: "Tityos",
        460: "Triton",
        461: "Amphitrite",
        462: "Typhon",
        463: "Monocerata",
        464: "Lamiai",
        465: "Empousa",
        466: "Lamia",
        467: "Mormo",
        468: "Mormolykeia",
        469: "Hecate",
        470: "Agriopas",
        471: "Damarchus",
        472: "Parrhasia",
        473: "Lykaia",
        474: "Lycaon",
        475: "Nyctimus",
        476: "Pegasus",
        477: "Acanthis",
        478: "Carduelis",
        479: "Alectryon",
        480: "Aphrodite",
        481: "Helios",
        482: "Autonous",
        483: "Gerana",
        484: "Oenoe",
        485: "Aethon",
        486: "Lark",
        487: "Alcyone",
        488: "Alkyonides",
        489: "halcyons",
        490: "Ceyx",
        491: "AÃ«don",
        492: "Procne",
        493: "Nyctimene",
        494: "Ascalaphus",
        495: "Philomela",
        496: "Cornix",
        497: "Coronis",
        498: "Corvus",
        499: "Apollo",
        500: "Cycnus",
        501: "Phaethon",
        502: "Eridanos",
        503: "Strix",
        504: "Tereus",
        505: "Hoopoe",
        506: "Ionia",
        507: "Crommyon",
        508: "Gadflies",
        509: "Myrmekes",
        510: "Menoetes",
        511: "Cercopes",
        512: "Actaeon",
        513: "panthers",
        514: "Argos",
        515: "Odysseus",
        516: "Laelaps",
        517: "Maera",
        518: "Erigone",
        519: "Arion",
        520: "Taras",
        521: "Styx",
        522: "Achilles",
        523: "Balius",
        524: "Xanthus",
        525: "Ladon",
        526: "Nemea",
        527: "Mysia",
        528: "Trojan",
        529: "LaocoÃ¶n",
        530: "AeÃ«tes",
        531: "Talos",
        532: "Aella",
        533: "Minor Planets",
        534: "Exoplanets",
        535: "Pan-STARRS I",
        536: "COAST L",
        537: "51 Pegasi J",
        538: "Giausar M",
        539: "MAGNUM I",
        540: "Beta Pegasi B",
        541: "Yed Prior s",
        542: "Nekkar T",
        543: "Cursa v",
        544: "Kraz T",
        545: "Syrma v",
        546: "Epsilon Pegasi r",
        547: "Ursae Minoris g",
        548: "Polaris v",
        549: "Beta Scorpii V",
        550: "Bellatrix H",
        551: "Acrux V",
        552: "Merak i",
        553: "SMARTS k",
        554: "Kitt V",
        555: "Merak J",
        556: "Keck J",
        557: "Zeta Puppis D",
        558: "Ran S",
        559: "Kraz R",
        560: "Alpha Pavonis f",
        561: "Kepler q",
        562: "SMARTS E",
        563: "Nekkar Y",
        564: "53 Orionis P",
        565: "Epsilon Pegasi O",
        566: "53 Orionis H",
        567: "Ran W",
        568: "Ursae Minoris X",
        569: "Lesath N",
        570: "Cursa k",
        571: "Kitt o",
        572: "TCS L",
        573: "Toppo  W",
        574: "Cursa v",
        575: "SMARTS h",
        576: "Achird X",
        577: "Piautos I",
        578: "53 Orionis e",
        579: "Schedar Q",
        580: "Syrma n",
        581: "Bellatrix t",
        582: "Alpha Pavonis p",
        583: "COAST U",
        584: "Furud Q",
        585: "CoRoT s",
        586: "Zosma L",
        587: "Acrux i",
        588: "Lesath l",
        589: "Kraz r",
        590: "Almaaz x",
        591: "Sirius d",
        592: "Ursae Minoris d",
        593: "MAGNUM e",
        594: "Keck S",
        595: "Furud l",
        596: "Ran s",
        597: "Alpha Pavonis N",
        598: "ZIMLAT r",
        599: "Alpha Pavonis t",
        600: "Kitt w",
        601: "Alpha Pavonis I",
        602: "Lesath j",
        603: "Polaris B",
        604: "Diadem K",
        605: "Kitt X",
        606: "Toppo  Q",
        607: "Acrux M",
        608: "Diadem G",
        609: "Polaris g",
        610: "51 Pegasi K",
        611: "Beta Scorpii F",
        612: "KAO j",
        613: "MAGNUM H",
        614: "Rukbat I",
        615: "Vega z",
        616: "Yed Prior y",
        617: "CHARA Z",
        618: "Rukbat E",
        619: "Giausar r",
        620: "Kraz i",
        621: "TCS c",
        622: "Ursae Minoris u",
        623: "TCS u",
        624: "CHARA U",
        625: "Kitt h",
        626: "Toppo  K",
        627: "MAGNUM t",
        628: "Toppo  o",
        629: "CoRoT O",
        630: "Ran g",
        631: "Zosma Y",
        632: "TCS u",
        633: "Lesath p",
        634: "GREGOR  E",
        635: "COAST v",
        636: "Kraz V",
        637: "Acrux V",
        638: "53 Orionis l",
        639: "Epsilon Pegasi q",
        640: "Wezen D",
        641: "Almaaz x",
        642: "Furud p",
        643: "Gamma Leonis Z",
        644: "Sirius x",
        645: "Nekkar J",
        646: "Furud N",
        647: "Achird U",
        648: "Toppo  T",
        649: "Almaaz B",
        650: "Beta Pegasi j",
        651: "SMARTS V",
        652: "Achird n",
        653: "Giausar O",
        654: "Kepler k",
        655: "Furud f",
        656: "CoRoT D",
        657: "Lesath g",
        658: "51 Pegasi e",
        659: "Bellatrix v",
        660: "Epsilon Pegasi c",
        661: "CHARA U",
        662: "Merak z",
        663: "CHARA E",
        664: "CoRoT U",
        665: "Gamma Leonis U",
        666: "Rukbat l",
        667: "Schedar B",
        668: "Ran O",
        669: "53 Orionis t",
        670: "Bellatrix B",
        671: "Piautos R",
        672: "Acrux I",
        673: "Gamma Leonis C",
        674: "MAGNUM t",
        675: "Toppo  L",
        676: "Giausar F",
        677: "Zosma c",
        678: "Kraz P",
        679: "ZIMLAT z",
        680: "Furud R",
        681: "Cursa n",
        682: "Epsilon Pegasi U",
        683: "AZT-11 u",
        684: "Sirius N"
    }

    while True:
        time.sleep(1)
        prng_file = open("name_generator_service.txt", "r")
        prng_text = prng_file.read()
        if prng_text == "run":
            print("prev" + prng_text)
            random.seed()
            random_int = random.randint(0, 1000)
            number_file = open("name_generator_service.txt", "w")

            # Select random name and write it to file
            if random_int >= len(planet_names):
                random_int = random_int % len(planet_names)
            random_name = planet_names[random_int]
            number_file.write(str(random_name))
            number_file.close()
            print("curr" + random_name)


if __name__ == "__main__":
    name_generator()
