# Tooling Issues

Claude Code and development tooling issues.

## Quick Reference

| ID | Issue | Tags |
|----|-------|------|
| TOOL-001 | Background processes cause OOM | `bash`, `background`, `memory` |

---

## [TOOL-001] Background Processes Cause Out of Memory

**Problem:** Claude Code crashes with "Out of memory" when running background processes that accumulate large output buffers.

---

### Pitfall: BashOutput Buffer Accumulation

When running long-lived background processes (like a solver polling loop), Claude Code stores all stdout/stderr in memory. Multiple failed attempts stack processes, and each process's output accumulates until memory is exhausted.

```bash
# ❌ BAD - Output accumulates in Claude Code's memory
cd solver-sdk && npm run dev &

# Then checking output repeatedly fills buffer:
# BashOutput(Reading shell output) → accumulates megabytes
```

```bash
# ✅ GOOD - Redirect to file, read with tail
cd solver-sdk && npm run dev > /tmp/solver.log 2>&1 &
echo "Solver PID: $!"

# Read limited output:
tail -30 /tmp/solver.log
```

### Prevention Checklist

1. **Before starting background processes:**
   ```bash
   pkill -f "pattern" 2>/dev/null  # Kill old instances
   ```

2. **When starting:**
   ```bash
   command > /tmp/logfile.log 2>&1 &  # File-based logging
   ```

3. **When reading logs:**
   ```bash
   tail -N /tmp/logfile.log  # Limit output size
   ```

4. **After completion:**
   ```bash
   pkill -f "pattern"; rm -f /tmp/logfile.log  # Cleanup
   ```

**Fix:** Always redirect background process output to files instead of letting it accumulate in BashOutput buffers. Clean up old processes before starting new ones.

---

**Tags:** `bash`, `background`, `memory`, `oom`, `solver`
