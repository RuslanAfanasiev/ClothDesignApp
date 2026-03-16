"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.5.0",
    "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Project {\n  id          String        @id @default(uuid())\n  name        String\n  description String?\n  ownerId     String\n  status      ProjectStatus @default(DRAFT)\n  sketches    Sketch[]\n  createdAt   DateTime      @default(now())\n  updatedAt   DateTime      @updatedAt\n}\n\nmodel Sketch {\n  id        String   @id @default(uuid())\n  name      String\n  imageUrl  String?\n  notes     String?\n  projectId String\n  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Template {\n  id          String   @id @default(uuid())\n  name        String\n  description String?\n  imageUrl    String?\n  category    String?\n  isPublic    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nenum ProjectStatus {\n  DRAFT\n  IN_PROGRESS\n  COMPLETED\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Project\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ProjectStatus\"},{\"name\":\"sketches\",\"kind\":\"object\",\"type\":\"Sketch\",\"relationName\":\"ProjectToSketch\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Sketch\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"projectId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"project\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"ProjectToSketch\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Template\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isPublic\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"project\",\"sketches\",\"_count\",\"Project.findUnique\",\"Project.findUniqueOrThrow\",\"Project.findFirst\",\"Project.findFirstOrThrow\",\"Project.findMany\",\"data\",\"Project.createOne\",\"Project.createMany\",\"Project.createManyAndReturn\",\"Project.updateOne\",\"Project.updateMany\",\"Project.updateManyAndReturn\",\"create\",\"update\",\"Project.upsertOne\",\"Project.deleteOne\",\"Project.deleteMany\",\"having\",\"_min\",\"_max\",\"Project.groupBy\",\"Project.aggregate\",\"Sketch.findUnique\",\"Sketch.findUniqueOrThrow\",\"Sketch.findFirst\",\"Sketch.findFirstOrThrow\",\"Sketch.findMany\",\"Sketch.createOne\",\"Sketch.createMany\",\"Sketch.createManyAndReturn\",\"Sketch.updateOne\",\"Sketch.updateMany\",\"Sketch.updateManyAndReturn\",\"Sketch.upsertOne\",\"Sketch.deleteOne\",\"Sketch.deleteMany\",\"Sketch.groupBy\",\"Sketch.aggregate\",\"Template.findUnique\",\"Template.findUniqueOrThrow\",\"Template.findFirst\",\"Template.findFirstOrThrow\",\"Template.findMany\",\"Template.createOne\",\"Template.createMany\",\"Template.createManyAndReturn\",\"Template.updateOne\",\"Template.updateMany\",\"Template.updateManyAndReturn\",\"Template.upsertOne\",\"Template.deleteOne\",\"Template.deleteMany\",\"Template.groupBy\",\"Template.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"name\",\"description\",\"imageUrl\",\"category\",\"isPublic\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"notes\",\"projectId\",\"ownerId\",\"ProjectStatus\",\"status\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\"]"),
    graph: "kgEaMAsEAABpACA8AABnADA9AAAJABA-AABnADA_AQAAAAFAAQBeACFBAQBfACFFQABhACFGQABhACFUAQBeACFWAABoViIBAAAAAQAgCwMAAGsAIDwAAGoAMD0AAAMAED4AAGoAMD8BAF4AIUABAF4AIUIBAF8AIUVAAGEAIUZAAGEAIVIBAF8AIVMBAF4AIQMDAACMAQAgQgAAbAAgUgAAbAAgCwMAAGsAIDwAAGoAMD0AAAMAED4AAGoAMD8BAAAAAUABAF4AIUIBAF8AIUVAAGEAIUZAAGEAIVIBAF8AIVMBAF4AIQMAAAADACABAAAEADACAAAFACABAAAAAwAgAQAAAAEAIAsEAABpACA8AABnADA9AAAJABA-AABnADA_AQBeACFAAQBeACFBAQBfACFFQABhACFGQABhACFUAQBeACFWAABoViICBAAAiwEAIEEAAGwAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAgEAACKAQAgPwEAAAABQAEAAAABQQEAAAABRUAAAAABRkAAAAABVAEAAAABVgAAAFYCAQsAAA4AIAc_AQAAAAFAAQAAAAFBAQAAAAFFQAAAAAFGQAAAAAFUAQAAAAFWAAAAVgIBCwAAEAAwAQsAABAAMAgEAAB9ACA_AQBwACFAAQBwACFBAQBxACFFQABzACFGQABzACFUAQBwACFWAAB8ViICAAAAAQAgCwAAEwAgBz8BAHAAIUABAHAAIUEBAHEAIUVAAHMAIUZAAHMAIVQBAHAAIVYAAHxWIgIAAAAJACALAAAVACACAAAACQAgCwAAFQAgAwAAAAEAIBIAAA4AIBMAABMAIAEAAAABACABAAAACQAgBAUAAHkAIBgAAHsAIBkAAHoAIEEAAGwAIAo8AABjADA9AAAcABA-AABjADA_AQBPACFAAQBPACFBAQBQACFFQABSACFGQABSACFUAQBPACFWAABkViIDAAAACQAgAQAAGwAwFwAAHAAgAwAAAAkAIAEAAAoAMAIAAAEAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgCAMAAHgAID8BAAAAAUABAAAAAUIBAAAAAUVAAAAAAUZAAAAAAVIBAAAAAVMBAAAAAQELAAAkACAHPwEAAAABQAEAAAABQgEAAAABRUAAAAABRkAAAAABUgEAAAABUwEAAAABAQsAACYAMAELAAAmADAIAwAAdwAgPwEAcAAhQAEAcAAhQgEAcQAhRUAAcwAhRkAAcwAhUgEAcQAhUwEAcAAhAgAAAAUAIAsAACkAIAc_AQBwACFAAQBwACFCAQBxACFFQABzACFGQABzACFSAQBxACFTAQBwACECAAAAAwAgCwAAKwAgAgAAAAMAIAsAACsAIAMAAAAFACASAAAkACATAAApACABAAAABQAgAQAAAAMAIAUFAAB0ACAYAAB2ACAZAAB1ACBCAABsACBSAABsACAKPAAAYgAwPQAAMgAQPgAAYgAwPwEATwAhQAEATwAhQgEAUAAhRUAAUgAhRkAAUgAhUgEAUAAhUwEATwAhAwAAAAMAIAEAADEAMBcAADIAIAMAAAADACABAAAEADACAAAFACALPAAAXQAwPQAAOAAQPgAAXQAwPwEAAAABQAEAXgAhQQEAXwAhQgEAXwAhQwEAXwAhRCAAYAAhRUAAYQAhRkAAYQAhAQAAADUAIAEAAAA1ACALPAAAXQAwPQAAOAAQPgAAXQAwPwEAXgAhQAEAXgAhQQEAXwAhQgEAXwAhQwEAXwAhRCAAYAAhRUAAYQAhRkAAYQAhA0EAAGwAIEIAAGwAIEMAAGwAIAMAAAA4ACABAAA5ADACAAA1ACADAAAAOAAgAQAAOQAwAgAANQAgAwAAADgAIAEAADkAMAIAADUAIAg_AQAAAAFAAQAAAAFBAQAAAAFCAQAAAAFDAQAAAAFEIAAAAAFFQAAAAAFGQAAAAAEBCwAAPQAgCD8BAAAAAUABAAAAAUEBAAAAAUIBAAAAAUMBAAAAAUQgAAAAAUVAAAAAAUZAAAAAAQELAAA_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-AABnADA_AQBeACFAAQBeACFBAQBfACFFQABhACFGQABhACFUAQBeACFWAABoViIERwAAAFYCSAAAAFYISQAAAFYITgAAZlYiA1cAAAMAIFgAAAMAIFkAAAMAIAsDAABrACA8AABqADA9AAADABA-AABqADA_AQBeACFAAQBeACFCAQBfACFFQABhACFGQABhACFSAQBfACFTAQBeACENBAAAaQAgPAAAZwAwPQAACQAQPgAAZwAwPwEAXgAhQAEAXgAhQQEAXwAhRUAAYQAhRkAAYQAhVAEAXgAhVgAAaFYiWgAACQAgWwAACQAgAAAAAAFfAQAAAAEBXwEAAAABAV8gAAAAAQFfQAAAAAEAAAAFEgAAjgEAIBMAAJEBACBcAACPAQAgXQAAkAEAIGIAAAEAIAMSAACOAQAgXAAAjwEAIGIAAAEAIAAAAAFfAAAAVgILEgAAfgAwEwAAgwEAMFwAAH8AMF0AAIABADBeAACBAQAgXwAAggEAMGAAAIIBADBhAACCAQAwYgAAggEAMGMAAIQBADBkAACFAQAwBj8BAAAAAUABAAAAAUIBAAAAAUVAAAAAAUZAAAAAAVIBAAAAAQIAAAAFACASAACJAQAgAwAAAAUAIBIAAIkBACATAACIAQAgAQsAAI0BADALAwAAawAgPAAAagAwPQAAAwAQPgAAagAwPwEAAAABQAEAXgAhQgEAXwAhRUAAYQAhRkAAYQAhUgEAXwAhUwEAXgAhAgAAAAUAIAsAAIgBACACAAAAhgEAIAsAAIcBACAKPAAAhQEAMD0AAIYBABA-AACFAQAwPwEAXgAhQAEAXgAhQgEAXwAhRUAAYQAhRkAAYQAhUgEAXwAhUwEAXgAhCjwAAIUBADA9AACGAQAQPgAAhQEAMD8BAF4AIUABAF4AIUIBAF8AIUVAAGEAIUZAAGEAIVIBAF8AIVMBAF4AIQY_AQBwACFAAQBwACFCAQBxACFFQABzACFGQABzACFSAQBxACEGPwEAcAAhQAEAcAAhQgEAcQAhRUAAcwAhRkAAcwAhUgEAcQAhBj8BAAAAAUABAAAAAUIBAAAAAUVAAAAAAUZAAAAAAVIBAAAAAQQSAAB-ADBcAAB_ADBeAACBAQAgYgAAggEAMAACBAAAiwEAIEEAAGwAIAY_AQAAAAFAAQAAAAFCAQAAAAFFQAAAAAFGQAAAAAFSAQAAAAEHPwEAAAABQAEAAAABQQEAAAABRUAAAAABRkAAAAABVAEAAAABVgAAAFYCAgAAAAEAIBIAAI4BACADAAAACQAgEgAAjgEAIBMAAJIBACAJAAAACQAgCwAAkgEAID8BAHAAIUABAHAAIUEBAHEAIUVAAHMAIUZAAHMAIVQBAHAAIVYAAHxWIgc_AQBwACFAAQBwACFBAQBxACFFQABzACFGQABzACFUAQBwACFWAAB8ViICBAYCBQADAQMAAQEEBwAAAAADBQAIGAAJGQAKAAAAAwUACBgACRkACgEDAAEBAwABAwUADxgAEBkAEQAAAAMFAA8YABAZABEAAAADBQAXGAAYGQAZAAAAAwUAFxgAGBkAGQYCAQcIAQgLAQkMAQoNAQwPAQ0RBA4SBQ8UARAWBBEXBhQYARUZARYaBBodBxseCxwfAh0gAh4hAh8iAiAjAiElAiInBCMoDCQqAiUsBCYtDScuAigvAikwBCozDis0Eiw2Ey03Ey46Ey87EzA8EzE-EzJABDNBFDRDEzVFBDZGFTdHEzhIEzlJBDpMFjtNGg"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs")));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map