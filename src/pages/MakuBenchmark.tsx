import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Search, Filter, 
  ArrowUpDown, Download, Send, Cpu 
} from 'lucide-react';
import './MakuBenchmark.css';

// --- ДАННЫЕ (Полный список) ---
type BenchmarkItem = {
  name: string;
  single: number;
  multi: number;
  category: string;
};

// Все процессоры из твоего списка
const BENCHMARK_DATA: BenchmarkItem[] = [
  { category: "Desktop Intel", name: "Intel Core i9 14900K", single: 1479, multi: 29558 },
  { category: "Desktop Intel", name: "Intel Core i7 14700K", single: 1458, multi: 28308 },
  { category: "Desktop Intel", name: "Intel Core i7 14700KF", single: 1460, multi: 28184 },
  { category: "Desktop Intel", name: "Intel Core Ultra 9 285K", single: 1245, multi: 26836 },
  { category: "Desktop Intel", name: "Intel Core i7 13700KF", single: 1430, multi: 25749 },
  { category: "Desktop Intel", name: "Intel Core i7 14700F", single: 1411, multi: 25157 },
  { category: "Desktop Intel", name: "Intel Core Ultra 7 265KF", single: 1288, multi: 22965 },
  { category: "Desktop Intel", name: "Intel Core i5 14600KF", single: 1346, multi: 20624 },
  { category: "Desktop Intel", name: "Intel Core i5 13600K", single: 1338, multi: 20336 },
  { category: "Desktop Intel", name: "Intel Core i5 13600KF", single: 1335, multi: 19448 },
  { category: "Desktop Intel", name: "Intel Core i5 12700KF", single: 1275, multi: 18785 },
  { category: "Desktop Intel", name: "Intel Core i9 10850K", single: 1196, multi: 15417 },
  { category: "Desktop Intel", name: "Intel Core i5 12600KF", single: 1245, multi: 14562 },
  { category: "Desktop Intel", name: "Intel Core i5 14400F", single: 1183, multi: 14109 },
  { category: "Desktop Intel", name: "Intel Core i5 13400", single: 1112, multi: 13373 },
  { category: "Desktop Intel", name: "Intel Core i5 14400", single: 1185, multi: 12738 },
  { category: "Desktop Intel", name: "Intel Core i5 13400F", single: 1186, multi: 12716 },
  { category: "Desktop Intel", name: "Intel Core i9 9900K", single: 1149, multi: 11983 },
  { category: "Desktop Intel", name: "Intel Core i5 12400F", single: 1154, multi: 11451 },
  { category: "Desktop Intel", name: "Intel Core i5 12400", single: 1143, multi: 11145 },
  { category: "Desktop Intel", name: "Intel Core i7 9700K", single: 1175, multi: 9019 },
  { category: "Desktop Intel", name: "Intel Core i5 11400", single: 1065, multi: 8813 },
  { category: "Desktop Intel", name: "Intel Core i7 9700F", single: 1107, multi: 8619 },
  { category: "Desktop Intel", name: "Intel Core i7 8700", single: 1112, multi: 8606 },
  { category: "Desktop Intel", name: "Intel Core i5 10500", single: 1023, multi: 8414 },
  { category: "Desktop Intel", name: "Intel Core i3 13100F", single: 1168, multi: 8226 },
  { category: "Desktop Intel", name: "Intel Core i5 10400", single: 992, multi: 8072 },
  { category: "Desktop Intel", name: "Intel Core i5 10400F", single: 962, multi: 7916 },
  { category: "Desktop Intel", name: "Intel Core i3 12100F", single: 1129, multi: 7548 },
  { category: "Desktop Intel", name: "Intel Core i5 11400F", single: 1052, multi: 7361 },
  { category: "Desktop Intel", name: "Intel Core i3 10105F", single: 1047, multi: 5676 },
  { category: "Desktop Intel", name: "Intel Core i3 10105", single: 1084, multi: 5665 },
  { category: "Desktop Intel", name: "Intel Core i5 9400F", single: 966, multi: 5659 },
  { category: "Desktop Intel", name: "Intel Core i5 8400", single: 976, multi: 5538 },
  { category: "Desktop Intel", name: "Intel Core i3 10100F", single: 1017, multi: 5310 },
  { category: "Desktop Intel", name: "Intel Core i5 8600K", single: 885, multi: 5287 },
  { category: "Desktop Intel", name: "Intel Core i7 7700", single: 1002, multi: 5139 },
  { category: "Desktop Intel", name: "Intel Core i7 6700", single: 820, multi: 4730 },
  { category: "Desktop Intel", name: "Intel Core i5 7600K", single: 1165, multi: 4650 },
  { category: "Desktop Intel", name: "Intel Core i7 4770", single: 886, multi: 4318 },
  { category: "Desktop Intel", name: "Intel Core i5 8365U", single: 1005, multi: 4264 },
  { category: "Desktop Intel", name: "Intel Core i7 4790", single: 804, multi: 4125 },
  { category: "Desktop Intel", name: "Intel Core i3 9100", single: 1024, multi: 3868 },
  { category: "Desktop Intel", name: "Intel Core i3 9100F", single: 982, multi: 3833 },
  { category: "Desktop Intel", name: "Intel Core i7 3770", single: 759, multi: 3628 },
  { category: "Desktop Intel", name: "Intel Core i5 6600", single: 952, multi: 3518 },
  { category: "Desktop Intel", name: "Intel Core i5 7500", single: 919, multi: 3483 },
  { category: "Desktop Intel", name: "Intel Core i3 8100", single: 883, multi: 3414 },
  { category: "Desktop Intel", name: "Intel Core i5 5675R", single: 885, multi: 3292 },
  { category: "Desktop Intel", name: "Intel Core i5 7400", single: 830, multi: 3145 },
  { category: "Desktop Intel", name: "Intel Core i5 4590", single: 849, multi: 3138 },
  { category: "Desktop Intel", name: "Intel Core i7 2600", single: 685, multi: 3035 },
  { category: "Desktop Intel", name: "Intel Core i5 4570", single: 730, multi: 2909 },
  { category: "Desktop Intel", name: "Intel Core i5 4460", single: 759, multi: 2836 },
  { category: "Desktop Intel", name: "Intel Core i5 3570", single: 733, multi: 2771 },
  { category: "Desktop Intel", name: "Intel Core i5 3470", single: 696, multi: 2632 },
  { category: "Desktop Intel", name: "Intel Core i3 7100", single: 932, multi: 2534 },
  { category: "Desktop Intel", name: "Intel Core i7 K 875", single: 446, multi: 2434 },
  { category: "Desktop Intel", name: "Intel Core i5 2500", single: 655, multi: 2429 },
  { category: "Desktop Intel", name: "Intel Core i5 2400", single: 611, multi: 2256 },
  { category: "Desktop Intel", name: "Intel Core i3 4360", single: 852, multi: 2150 },
  { category: "Desktop Intel", name: "Intel Core i5 2320", single: 507, multi: 1953 },
  { category: "Desktop Intel", name: "Intel Core i3 3220", single: 620, multi: 1619 },
  { category: "Desktop Intel", name: "Intel Core i3 2120", single: 593, multi: 1515 },
  { category: "Desktop Intel", name: "Intel Core i3 2100", single: 547, multi: 1390 },
  { category: "Desktop Intel", name: "Intel Core i3 540", single: 336, multi: 1118 },

  // --- Настольные AMD Ryzen ---
  { category: "Desktop AMD", name: "AMD Ryzen 9 9950X3D", single: 1287, multi: 33918 },
  { category: "Desktop AMD", name: "AMD Ryzen 9 7950X3D", single: 1268, multi: 32468 },
  { category: "Desktop AMD", name: "AMD Ryzen 9 9900X", single: 1264, multi: 25445 },
  { category: "Desktop AMD", name: "AMD Ryzen 9 9950X", single: 1245, multi: 22250 },
  { category: "Desktop AMD", name: "AMD Ryzen 9 5900X", single: 1116, multi: 20542 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 9800X3D", single: 1183, multi: 18243 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 7700", single: 1226, multi: 15908 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 7800X3D", single: 1032, multi: 15447 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 8700F", single: 1159, multi: 15367 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 9600X", single: 1286, multi: 14341 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 5800X", single: 1100, multi: 13799 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 7500F", single: 1155, multi: 12801 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 5800X3D", single: 1050, multi: 12644 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 7600X", single: 1246, multi: 12485 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 5700G", single: 1026, multi: 12197 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 5700X3D", single: 929, multi: 11887 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 5700X", single: 1072, multi: 11584 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 3700X", single: 996, multi: 11556 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 8400F", single: 1062, multi: 10893 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 5600X", single: 1071, multi: 10431 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 5600", single: 1059, multi: 10382 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 5500", single: 965, multi: 9788 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 5600G", single: 962, multi: 9399 },
  { category: "Desktop AMD", name: "AMD Ryzen 7 2700X", single: 899, multi: 9379 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 4500", single: 956, multi: 8512 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 4600G", single: 955, multi: 8505 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 3600", single: 936, multi: 8070 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 1600X", single: 872, multi: 6695 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 1600", single: 751, multi: 5906 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 2600", single: 719, multi: 5400 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 3400G", single: 862, multi: 4653 },
  { category: "Desktop AMD", name: "AMD Ryzen 5 2400G", single: 790, multi: 4304 },
  { category: "Desktop AMD", name: "AMD Ryzen 3 3200G", single: 839, multi: 3288 },

  // --- Ноутбучные Intel Core ---
  { category: "Laptop Intel", name: "Intel Core Ultra 9 275HX", single: 1280, multi: 26370 },
  { category: "Laptop Intel", name: "Intel Core i9 14900HX", single: 1463, multi: 20832 },
  { category: "Laptop Intel", name: "Intel Core i7 14650H", single: 1342, multi: 18248 },
  { category: "Laptop Intel", name: "Intel Core i7 13650HX", single: 1288, multi: 15511 },
  { category: "Laptop Intel", name: "Intel Core Ultra 7 155H", single: 1292, multi: 15468 },
  { category: "Laptop Intel", name: "Intel Core i7 13620H", single: 1290, multi: 15028 },
  { category: "Laptop Intel", name: "Intel Core i5 12500H", single: 1186, multi: 10926 },
  { category: "Laptop Intel", name: "Intel Core 5 210H", single: 1219, multi: 10330 },
  { category: "Laptop Intel", name: "Intel Core i5 12450H", single: 1090, multi: 10088 },
  { category: "Laptop Intel", name: "Intel Core i5 13420H", single: 1155, multi: 9369 },
  { category: "Laptop Intel", name: "Intel Core i5 11400H", single: 1059, multi: 9115 },
  { category: "Laptop Intel", name: "Intel Core i7 10750H", single: 1120, multi: 8471 },
  { category: "Laptop Intel", name: "Intel Core i5 11260H", single: 1044, multi: 8126 },
  { category: "Laptop Intel", name: "Intel Core i7 1255U", single: 1227, multi: 7975 },
  { category: "Laptop Intel", name: "Intel Core i3 1220P", single: 1137, multi: 7886 },
  { category: "Laptop Intel", name: "Intel Core i7 9750HF", single: 1018, multi: 7567 },
  { category: "Laptop Intel", name: "Intel Core i7 12700H", single: 1206, multi: 7356 },
  { category: "Laptop Intel", name: "Intel Core i7 1165G7", single: 1115, multi: 6172 },
  { category: "Laptop Intel", name: "Intel Core i5 1334U", single: 1001, multi: 6170 },
  { category: "Laptop Intel", name: "Intel Core i7 9750H", single: 993, multi: 5620 },
  { category: "Laptop Intel", name: "Intel Core i5 1135G7", single: 1020, multi: 5588 },
  { category: "Laptop Intel", name: "Intel Core i3 1125G4", single: 888, multi: 5153 },
  { category: "Laptop Intel", name: "Intel Core i5 10310U", single: 1037, multi: 5107 },
  { category: "Laptop Intel", name: "Intel Core i5 10210U", single: 954, multi: 5068 },
  { category: "Laptop Intel", name: "Intel Core i5 10300H", single: 1035, multi: 5005 },
  { category: "Laptop Intel", name: "Intel Core i5 8300H", single: 980, multi: 4431 },
  { category: "Laptop Intel", name: "Intel Core i7 6700HQ", single: 796, multi: 4064 },
  { category: "Laptop Intel", name: "Intel Core i5 1035G1", single: 850, multi: 4017 },
  { category: "Laptop Intel", name: "Intel Core i5 1235U", single: 1039, multi: 3662 },
  { category: "Laptop Intel", name: "Intel Core i5 8250U", single: 826, multi: 3527 },
  { category: "Laptop Intel", name: "Intel Core i7 7700HQ", single: 700, multi: 3397 },
  { category: "Laptop Intel", name: "Intel Core i5 8350U", single: 868, multi: 3190 },
  { category: "Laptop Intel", name: "Intel Core i7 3630QM", single: 647, multi: 3134 },
  { category: "Laptop Intel", name: "Intel Core i7 7300HQ", single: 807, multi: 3001 },
  { category: "Laptop Intel", name: "Intel Core i3 1005G1", single: 829, multi: 2636 },
  { category: "Laptop Intel", name: "Intel Core i3 10100U", single: 970, multi: 2381 },
  { category: "Laptop Intel", name: "Intel Core i3 8130U", single: 828, multi: 2153 },
  { category: "Laptop Intel", name: "Intel Core i7 7500U", single: 725, multi: 2048 },
  { category: "Laptop Intel", name: "Intel Core i5 7200U", single: 750, multi: 2043 },
  { category: "Laptop Intel", name: "Intel Core i7 5650U", single: 794, multi: 1941 },
  { category: "Laptop Intel", name: "Intel Core i5 6200U", single: 677, multi: 1830 },
  { category: "Laptop Intel", name: "Intel Core i7 5500U", single: 710, multi: 1807 },
  { category: "Laptop Intel", name: "Intel Core i3 4200M", single: 633, multi: 1688 },
  { category: "Laptop Intel", name: "Intel Core i5 5500U", single: 717, multi: 1666 },
  { category: "Laptop Intel", name: "Intel Core i5 5200U", single: 597, multi: 1521 },
  { category: "Laptop Intel", name: "Intel Core i7 4510U", single: 705, multi: 1506 },
  { category: "Laptop Intel", name: "Intel Core i5 3320M", single: 618, multi: 1503 },
  { category: "Laptop Intel", name: "Intel Core i3 4000M", single: 550, multi: 1410 },
  { category: "Laptop Intel", name: "Intel Core i5 4210U", single: 554, multi: 1368 },
  { category: "Laptop Intel", name: "Intel Core i5 3210M", single: 594, multi: 1355 },
  { category: "Laptop Intel", name: "Intel Core i7 3517U", single: 491, multi: 1333 },
  { category: "Laptop Intel", name: "Intel Core i5 2450M", single: 554, multi: 1320 },
  { category: "Laptop Intel", name: "Intel Core i3 3120M", single: 480, multi: 1224 },
  { category: "Laptop Intel", name: "Intel Core i3 5005U", single: 474, multi: 1207 },
  { category: "Laptop Intel", name: "Intel Core i5 3337U", single: 498, multi: 1187 },
  { category: "Laptop Intel", name: "Intel Core i3 3110M", single: 456, multi: 1148 },
  { category: "Laptop Intel", name: "Intel Core i5 M560", single: 389, multi: 1122 },
  { category: "Laptop Intel", name: "Intel Core i3 4030U", single: 436, multi: 1072 },
  { category: "Laptop Intel", name: "Intel Core i7 M620", single: 438, multi: 1063 },
  { category: "Laptop Intel", name: "Intel Core i3 380M", single: 302, multi: 1028 },
  { category: "Laptop Intel", name: "Intel Core i3 4010U", single: 386, multi: 968 },
  { category: "Laptop Intel", name: "Intel Core i3 2330M", single: 320, multi: 893 },
  { category: "Laptop Intel", name: "Intel Core i3 330M", single: 301, multi: 769 },

  // --- Ноутбучные AMD Ryzen ---
  { category: "Laptop AMD", name: "AMD Ryzen 9 7945HX", single: 1223, multi: 30664 },
  { category: "Laptop AMD", name: "AMD Ryzen AI 9 HX 370", single: 1129, multi: 18363 },
  { category: "Laptop AMD", name: "AMD Ryzen 9 7940HS", single: 1184, multi: 15244 },
  { category: "Laptop AMD", name: "AMD Ryzen 7 8845H", single: 1158, multi: 15223 },
  { category: "Laptop AMD", name: "AMD Ryzen AI 9 365", single: 848, multi: 14167 },
  { category: "Laptop AMD", name: "AMD Ryzen 7 8840HS", single: 1143, multi: 12286 },
  { category: "Laptop AMD", name: "AMD Ryzen 7 7435H", single: 964, multi: 11245 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 6600H", single: 1139, multi: 10775 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 7535HS", single: 997, multi: 8826 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 7530U", single: 1032, multi: 8803 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 5600H", single: 964, multi: 8646 },
  { category: "Laptop AMD", name: "AMD Ryzen 7 4800HS", single: 944, multi: 8585 },
  { category: "Laptop AMD", name: "AMD Ryzen 7 7730U", single: 1033, multi: 8057 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 7430U", single: 957, multi: 7801 },
  { category: "Laptop AMD", name: "AMD Ryzen 7 5700U", single: 969, multi: 7550 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 5500U", single: 913, multi: 6199 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 3550H", single: 751, multi: 4063 },
  { category: "Laptop AMD", name: "AMD Ryzen 7 3700U", single: 745, multi: 3864 },
  { category: "Laptop AMD", name: "AMD Ryzen 5 3500U", single: 732, multi: 2971 },
  { category: "Laptop AMD", name: "AMD Ryzen 3 3250U", single: 725, multi: 1933 },
  { category: "Laptop AMD", name: "AMD Ryzen 3 3200U", single: 682, multi: 1774 },

  // --- Прочие Intel ---
  { category: "Other", name: "Intel NVIDIA CC150", single: 839, multi: 8680 },
  { category: "Other", name: "Intel N97", single: 696, multi: 2225 },
  { category: "Other", name: "Intel Pentium Gold 7505", single: 709, multi: 2210 },
  { category: "Other", name: "Intel Pentium Gold G6400", single: 796, multi: 2036 },
  { category: "Other", name: "Intel Celeron N5095", single: 482, multi: 1908 },
  { category: "Other", name: "Intel Core 2 Quad Q8400", single: 369, multi: 1391 },
  { category: "Other", name: "Intel Pentium Gold G4400", single: 690, multi: 1357 },
  { category: "Other", name: "Intel Pentium 5405U", single: 466, multi: 1312 },
  { category: "Other", name: "Intel Core 2 Quad Q6600", single: 332, multi: 1310 },
  { category: "Other", name: "Intel Pentium Silver N5000", single: 398, multi: 1304 },
  { category: "Other", name: "Intel Pentium 4417U", single: 426, multi: 1207 },
  { category: "Other", name: "Intel Celeron N4100", single: 304, multi: 1113 },
  { category: "Other", name: "Intel Pentium G620", single: 473, multi: 925 },
  { category: "Other", name: "Intel Core 2 Duo P9700", single: 395, multi: 756 },
  { category: "Other", name: "Intel Celeron J3160", single: 177, multi: 703 },
  { category: "Other", name: "Intel Celeron E3500", single: 367, multi: 679 },
  { category: "Other", name: "Intel Pentium B970", single: 410, multi: 658 },
  { category: "Other", name: "Intel Celeron E3200", single: 331, multi: 641 },
  { category: "Other", name: "Intel Pentium P6200", single: 300, multi: 638 },
  { category: "Other", name: "Intel Pentium E5500", single: 359, multi: 600 },
  { category: "Other", name: "Intel Celeron T3100", single: 260, multi: 510 },
  { category: "Other", name: "Intel Celeron N3350", single: 224, multi: 483 },
  { category: "Other", name: "Intel Celeron B800", single: 248, multi: 458 },
  { category: "Other", name: "Intel Core 2 Duo T5870", single: 216, multi: 407 },
  { category: "Other", name: "Intel Celeron N3050", single: 143, multi: 204 },

  // --- Intel Xeon ---
  { category: "Xeon", name: "Intel Xeon E5 2696 V3", single: 665, multi: 14448 },
  { category: "Xeon", name: "Intel Xeon E5 2690 V4", single: 781, multi: 13832 },
  { category: "Xeon", name: "Intel Xeon E5 2680 V4", single: 816, multi: 12648 },
  { category: "Xeon", name: "Intel Xeon E5 2673 V3", single: 715, multi: 10848 },
  { category: "Xeon", name: "Intel Xeon E5 2670 V3", single: 712, multi: 10682 },
  { category: "Xeon", name: "Intel Xeon E5 2699 V3", single: 826, multi: 10465 },
  { category: "Xeon", name: "Intel Xeon E5 2680 V3", single: 728, multi: 10117 },
  { category: "Xeon", name: "Intel Xeon E5 2666 V3", single: 801, multi: 9254 },
  { category: "Xeon", name: "Intel Xeon E5 2650 V4", single: 684, multi: 9233 },
  { category: "Xeon", name: "Intel Xeon E5 2667 V4", single: 865, multi: 8703 },
  { category: "Xeon", name: "Intel Xeon E5 1660 V4", single: 853, multi: 8519 },
  { category: "Xeon", name: "Intel Xeon E5 2640 V4", single: 791, multi: 8201 },
  { category: "Xeon", name: "Intel Xeon E5 2689 0", single: 585, multi: 5875 },
  { category: "Xeon", name: "Intel Xeon E5 2650 V2", single: 585, multi: 5508 },
  { category: "Xeon", name: "Intel Xeon E3 1240 V5", single: 816, multi: 4657 },
  { category: "Xeon", name: "Intel Xeon E5 2620 V3", single: 560, multi: 4510 },
  { category: "Xeon", name: "Intel Xeon E5 2630 V2", single: 540, multi: 4240 },
  { category: "Xeon", name: "Intel Xeon E3 1240", single: 646, multi: 2670 },
  { category: "Xeon", name: "Intel Xeon E5 2643 0", single: 553, multi: 2612 },

  // --- Прочие AMD ---
  { category: "Other AMD", name: "AMD EPYC 9754", single: 424, multi: 97004 },
  { category: "Other AMD", name: "AMD EPYC 7452", single: 618, multi: 46327 },
  { category: "Other AMD", name: "AMD FX 8320", single: 489, multi: 2999 },
  { category: "Other AMD", name: "AMD Phenom II X6 1100T", single: 401, multi: 2244 },
  { category: "Other AMD", name: "AMD Athlon 3000G", single: 727, multi: 2063 },
  { category: "Other AMD", name: "AMD A10 9700", single: 500, multi: 1932 },
  { category: "Other AMD", name: "AMD A10 6700", single: 545, multi: 1859 },
  { category: "Other AMD", name: "AMD Athlon X4 760K", single: 502, multi: 1835 },
  { category: "Other AMD", name: "AMD A10 PRO-7800B", single: 512, multi: 1802 },
  { category: "Other AMD", name: "AMD FX 4300", single: 491, multi: 1761 },
  { category: "Other AMD", name: "AMD Phenom II X4 970", single: 412, multi: 1649 },
  { category: "Other AMD", name: "AMD A8 5600K", single: 486, multi: 1545 },
  { category: "Other AMD", name: "AMD FX 4170", single: 437, multi: 1352 },
  { category: "Other AMD", name: "AMD Athlon Gold 3150U", single: 508, multi: 1332 },
  { category: "Other AMD", name: "AMD Athlon II X3 460", single: 404, multi: 1040 },
  { category: "Other AMD", name: "AMD A4 6300", single: 416, multi: 884 },
  { category: "Other AMD", name: "AMD A6 3420M", single: 300, multi: 741 },
  { category: "Other AMD", name: "AMD Athlon 64 X2 4400+", single: 242, multi: 477 },
  { category: "Other AMD", name: "AMD A4 3305M", single: 219, multi: 418 },
  { category: "Other AMD", name: "AMD E-450", single: 109, multi: 162 },
  { category: "Other AMD", name: "AMD C-50", single: 91, multi: 157 },

  // --- ARM ---
  { category: "ARM", name: "Qualcomm Snapdragon 860", single: 968, multi: 59 }, // Видимо опечатка в оригинале (59 мульти?), оставил как есть
];

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'Desktop Intel', label: 'Intel Desktop' },
  { id: 'Desktop AMD', label: 'AMD Desktop' },
  { id: 'Laptop Intel', label: 'Intel Laptop' },
  { id: 'Laptop AMD', label: 'AMD Laptop' },
  { id: 'Xeon', label: 'Intel Xeon' },
  { id: 'Other', label: 'Прочие Intel' },
  { id: 'Other AMD', label: 'Прочие AMD' },
  { id: 'ARM', label: 'ARM' },
];

export const MakuBenchmark = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: 'single' | 'multi' | 'name', direction: 'asc' | 'desc' }>({
    key: 'multi',
    direction: 'desc'
  });

  // Логика фильтрации и сортировки
  const processedData = useMemo(() => {
    let data = [...BENCHMARK_DATA];

    // 1. Поиск (Global Search via /)
    if (search.startsWith('/')) {
      const query = search.slice(1).toLowerCase();
      data = data.filter(item => item.name.toLowerCase().includes(query));
    } else {
      // Обычный поиск + фильтр по табам
      if (activeTab !== 'all') {
        data = data.filter(item => item.category === activeTab);
      }
      if (search) {
        data = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      }
    }

    // 2. Сортировка
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return data;
  }, [search, activeTab, sortConfig]);

  // Хендлер сортировки
  const requestSort = (key: 'single' | 'multi' | 'name') => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Максимальные значения для прогресс-баров
  const maxSingle = 1600; // Примерный максимум для красивого графика
  const maxMulti = 100000; // EPYC выбивает почти 100к

  return (
    <div className="bench-page container">
      
      {/* Hero */}
      <motion.div 
        className="bench-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>MakuTweaker <span className="text-gradient">Benchmark</span></h1>
        <p>Сравнительная таблица производительности процессоров</p>
      </motion.div>

      {/* Controls: Search & Tabs */}
      <div className="bench-controls">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Поиск процессора (введите / для глобального поиска)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="tabs-scroll-wrapper">
          <div className="tabs-list">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(cat.id); setSearch(''); }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="bench-table-header">
        <div className="col-name" onClick={() => requestSort('name')}>
          Процессор <ArrowUpDown size={14} />
        </div>
        <div className="col-score" onClick={() => requestSort('single')}>
          Одноядерный <ArrowUpDown size={14} />
        </div>
        <div className="col-score" onClick={() => requestSort('multi')}>
          Многопоточный <ArrowUpDown size={14} />
        </div>
      </div>

      {/* Table Rows */}
      <div className="bench-list">
        {processedData.length > 0 ? (
          processedData.map((item, index) => (
            <motion.div 
              key={item.name + index}
              className="bench-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * (index > 20 ? 20 : index) }} // Лимит задержки для длинного списка
            >
              <div className="col-name">
                <span className="cpu-icon"><Cpu size={18}/></span>
                <span className="cpu-name">{item.name}</span>
                <span className="cpu-cat-badge">{item.category}</span>
              </div>
              
              <div className="col-score">
                <span className="score-val">{item.single}</span>
                <div className="score-bar-bg">
                  <div 
                    className="score-bar-fill single" 
                    style={{ width: `${Math.min((item.single / maxSingle) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="col-score">
                <span className="score-val accent">{item.multi}</span>
                <div className="score-bar-bg">
                  <div 
                    className="score-bar-fill multi" 
                    style={{ width: `${Math.min((item.multi / maxMulti) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-results">
            <Filter size={40} />
            <p>Ничего не найдено</p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="bench-actions">
        <button className="btn btn-primary">
          <Download size={20} /> Скачать MakuTweaker
        </button>
        <button className="btn btn-outline">
          <Send size={20} /> Отправить результат
        </button>
      </div>

    </div>
  );
};