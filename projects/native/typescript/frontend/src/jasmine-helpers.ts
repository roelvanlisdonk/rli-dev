import { JSDOM } from 'jsdom';

const { document } = new JSDOM('<html><head></head><body></body></html>').window;
const g = global as any;
g.document = document;
