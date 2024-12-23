extern "C" {
   unsigned char* save_state(size_t* size);
   void load_state(const unsigned char* state, size_t size);
}
