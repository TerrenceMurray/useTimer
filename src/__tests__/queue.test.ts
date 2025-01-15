import { Queue } from "@/utils";


describe('Queue', () => {
    it("should be able to enqueue items", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.isEmpty()).toBe(false);
    });

    it("should be able to dequeue items", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.dequeue()).toBe(1);
    });

    it("should be able to peek at the first item", () => {
      const queue = new Queue<number>();
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.peek()).toBe(1);
    });

    it("should be able to check if it is empty", () => {
      const queue = new Queue<number>();
      expect(queue.isEmpty()).toBe(true);
    });
});